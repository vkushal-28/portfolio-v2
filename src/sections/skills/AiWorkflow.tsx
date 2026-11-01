import { TerminalLoop } from '@/components/motion'
import { Caret, Chip, Glow, RichText, WindowFrame } from '@/components/ui'
import { toolkit } from '@/data'
import { cn } from '@/lib/cn'

const { ai } = toolkit

const lines = ai.lines.map((line) => (
  <span key={line.text} className={cn(line.done ? 'text-ac' : 'text-tx2')}>
    <span className="text-ac">{line.mark}</span> {line.text}
    {line.done && <Caret variant="block" />}
  </span>
))

export function AiWorkflow() {
  return (
    <div className="relative isolate h-full p-6 md:p-8">
      <Glow size={300} className="-top-32 -right-28 -z-10" />
      <h3 className="max-w-sm text-[clamp(26px,2.6vw,34px)] leading-[1.1] font-semibold tracking-[-0.035em] text-tx">
        <RichText runs={ai.title} />
      </h3>

      <WindowFrame variant="terminal" title={ai.terminalTitle} className="mt-6">
        <TerminalLoop lines={lines} />
      </WindowFrame>

      <ul className="mt-6 flex flex-wrap gap-2">
        {ai.tools.map((tool) => (
          <Chip key={tool} as="li" dot="solid">
            {tool}
          </Chip>
        ))}
      </ul>
    </div>
  )
}

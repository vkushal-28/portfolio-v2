import { motion, steps, useReducedMotion } from 'motion/react'
import { viewportOnce } from '@/components/motion/presets'
import { cn } from '@/lib/cn'
import { tokenize, type TokenKind } from '@/lib/highlight'
import { Caret } from './Caret'

const kinds = {
  keyword: 'text-syn-kw',
  string: 'text-ac',
  literal: 'text-syn-num',
  punct: 'text-tx2',
  text: 'text-tx',
} satisfies Record<TokenKind, string>

export type CodeBlockProps = {
  code: string
  /** Seconds before the first line types in. */
  delay?: number
  /** Seconds between lines. Default 0.35. */
  step?: number
  /** Blinking block cursor after the last line. Default true. */
  caret?: boolean
  className?: string
}

/** Syntax-coloured snippet whose lines "type in" one after another once in view. */
export function CodeBlock({
  code,
  delay = 0,
  step = 0.35,
  caret = true,
  className,
}: CodeBlockProps) {
  const reduce = useReducedMotion()
  const lines = code.split('\n')

  return (
    // The in-view trigger lives on <pre>: fully clipped lines never intersect on their own.
    <motion.pre
      className={cn('overflow-x-auto font-mono', className)}
      initial={reduce ? 'show' : 'hidden'}
      whileInView="show"
      viewport={viewportOnce}
    >
      <code>
        {lines.map((line, i) => (
          <motion.span
            key={i}
            className="block whitespace-pre"
            variants={{
              hidden: { clipPath: 'inset(0 100% 0 0)' },
              show: {
                clipPath: 'inset(0 0% 0 0)',
                transition: {
                  duration: Math.min(0.3, 0.01 * line.length + 0.1),
                  delay: delay + i * step,
                  ease: steps(Math.max(line.length, 1)),
                },
              },
            }}
          >
            {tokenize(line).map((token, j) => (
              <span key={j} className={kinds[token.kind]}>
                {token.text}
              </span>
            ))}
            {caret && i === lines.length - 1 && <Caret variant="block" />}
          </motion.span>
        ))}
      </code>
    </motion.pre>
  )
}

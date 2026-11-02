import { IndexRow, MonoLabel } from '@/components/ui'
import { coreStack, toolkit } from '@/data'
import { pad2 } from '@/lib/format'

export function CoreStack() {
  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <MonoLabel>{toolkit.coreStack.label}</MonoLabel>
        <MonoLabel tone="accent" dot as="span">
          {toolkit.coreStack.badge}
        </MonoLabel>
      </div>
      <ul className="mt-4">
        {coreStack.map((item, i) => (
          <IndexRow key={item.name} index={pad2(i + 1)} title={item.name} meta={item.sub} />
        ))}
      </ul>
    </div>
  )
}

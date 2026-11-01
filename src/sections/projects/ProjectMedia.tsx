import { GridPattern, WindowFrame } from '@/components/ui'
import { work, type Project } from '@/data'

/** Card media: a screenshot when supplied, otherwise a mock browser window tinted per project. */
export function ProjectMedia({ project }: { project: Project }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.title} screenshot`}
        className="absolute inset-0 size-full object-cover transition-transform duration-800 ease-expo group-hover/card:scale-[1.04]"
      />
    )
  }

  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-transform duration-800 ease-expo group-hover/card:scale-[1.04]"
      >
        <GridPattern size={32} color="var(--color-ln2)" />
        <WindowFrame
          variant="browser"
          className="absolute top-[18%] left-1/2 w-[60%] -translate-x-1/2 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)]"
          bodyClassName="flex flex-col gap-2.5 p-5"
        >
          <span className="h-2.5 w-[45%] rounded-full" style={{ backgroundColor: project.tint }} />
          <span className="h-2 w-[80%] rounded-full bg-ln3" />
          <span className="h-2 w-[60%] rounded-full bg-ln3" />
          <span className="mt-3 h-40 rounded-lg border border-ln2 bg-s2" />
        </WindowFrame>
      </div>
      <span className="absolute right-4 bottom-4 font-mono text-xs text-mu2">
        {work.screenshotPlaceholder}
      </span>
    </>
  )
}

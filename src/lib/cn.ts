import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Teach tailwind-merge the custom @theme tokens so e.g. `text-ac` and `text-sm`
// are not treated as conflicts. Keep in sync with src/styles/index.css.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: [
        'bg',
        'bg2',
        's1',
        's2',
        's3',
        'ln1',
        'ln2',
        'ln3',
        'ln4',
        'tx',
        'tx2',
        'tx3',
        'mu',
        'mu2',
        'mu3',
        'ac',
        'ac2',
        'info',
        'info-bg',
        'err',
        'syn-kw',
        'syn-num',
      ],
      radius: ['tile', 'window', 'card', 'bento'],
      ease: ['expo'],
    },
  },
})

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

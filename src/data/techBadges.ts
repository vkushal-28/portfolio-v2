import * as image from './images'
import type { TechBadge } from './types'

/** Hero orbit badges: tech logo in a ring tinted with `color`. Outer ring 72° apart, inner 120°. */
export const techBadges: readonly TechBadge[] = [
  {
    name: 'React',
    imageLink: `${image.imageUrl + image.react}`,
    color: '#61DAFB',
    ring: 'outer',
    angle: 180,
  },
  {
    name: 'Node.js',
    imageLink: `${image.imageUrl + image.node}`,
    color: '#8CC84B',
    ring: 'outer',
    angle: 108,
  },
  {
    name: 'MongoDB',
    imageLink: `${image.imageUrl + image.mongo}`,
    color: '#4DB33D',
    ring: 'outer',
    angle: 324,
  },
  {
    name: 'Claude',
    imageLink: `${image.imageUrl + image.claude}`,
    color: '#D97757',
    ring: 'inner',
    angle: 135,
  },
  {
    name: 'Codex',
    imageLink: `${image.imageUrl + image.codex}`,
    color: '#EDEBE6',
    ring: 'inner',
    angle: 255,
  },
  {
    name: 'TypeScript',
    imageLink: `${image.imageUrl + image.ts}`,
    color: '#3178C6',
    ring: 'outer',
    angle: 252,
  },
  {
    name: 'AWS',
    imageLink: `${image.imageUrl + image.awsLight}`,
    color: '#FF9900',
    ring: 'outer',
    angle: 36,
  },
  {
    name: 'Copilot',
    imageLink: `${image.imageUrl + image.copilot}`,
    color: '#8957E5',
    ring: 'inner',
    angle: 15,
  },
]

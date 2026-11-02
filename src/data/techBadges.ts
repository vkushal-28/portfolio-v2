import type { TechBadge } from './types'

/** Hero orbit badges. Text labels with a coloured dot — no brand logos. */
export const techBadges: readonly TechBadge[] = [
  { name: 'React', color: '#61DAFB', ring: 'outer', angle: 180 },
  { name: 'Node.js', color: '#8CC84B', ring: 'outer', angle: 60 },
  { name: 'MongoDB', color: '#4DB33D', ring: 'outer', angle: 300 },
  { name: 'Claude', color: '#D97757', ring: 'inner', angle: 135 },
  { name: 'Codex', color: '#EDEBE6', ring: 'inner', angle: 315 },
]

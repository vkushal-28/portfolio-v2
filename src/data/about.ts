import { profile } from './profile'

export const about = {
  header: { index: '01', label: 'About me' },
  portraitAlt: `Portrait of ${profile.name}`,
  portraitPlaceholder: '[ Portrait photo ]',
  currentlyLabel: 'Currently:',
} as const

import type { TextRun } from './types'

/** Copy for the Contact section. Address and links live in `profile.ts` / `socials.ts`. */
export const contact = {
  header: { index: '06', label: 'Contact' },
  /** One array per line of the giant heading. */
  titleLines: [
    [{ text: 'Let’s build' }],
    [
      { text: 'something', tone: 'outline' },
      { text: ' great.', tone: 'accent' },
    ],
  ] satisfies TextRun[][],
  intro:
    'Open to senior full-stack roles and ambitious projects in fintech, energy and enterprise. Have something in mind? My inbox is open.',
  emailLabel: 'Email',
  elsewhereLabel: 'Elsewhere',
  resumeLabel: 'Résumé (PDF)',
  form: {
    label: 'Contact form',
    fields: {
      name: { label: 'Your name', placeholder: 'Jane Doe' },
      email: { label: 'Email', placeholder: 'jane@company.com' },
      topic: {
        label: 'I’m reaching out about',
        placeholder: 'A senior role, a project, a question…',
      },
      message: { label: 'Message', placeholder: 'Tell me a little about what you’re building.' },
    },
    errors: {
      name: 'Please tell me your name.',
      emailMissing: 'Please add your email so I can reply.',
      emailInvalid: 'That email doesn’t look quite right.',
      message: 'Please write a short message (at least 10 characters).',
      failed: 'Something went wrong sending that. Please email me directly instead.',
    },
    submit: 'Send message',
    sending: 'Sending…',
  },
  success: {
    title: 'Message sent.',
    body: 'Thanks for reaching out — I’ll be in touch soon.',
  },
} as const

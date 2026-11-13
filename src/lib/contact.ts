import emailjs from '@emailjs/browser'

export type ContactMessage = {
  name: string
  email: string
  topic: string
  message: string
}

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

/**
 * Sends a contact-form message through EmailJS.
 *
 * The EmailJS template receives `{{name}}`, `{{email}}`, `{{topic}}`, `{{message}}` and `{{time}}`;
 * set its Reply-To to `{{email}}` so replying goes straight to the sender.
 * Throws if EmailJS isn't configured or the request fails, so the form shows its error state.
 */
export async function sendMessage({ name, email, topic, message }: ContactMessage): Promise<void> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error('EmailJS is not configured: set VITE_EMAILJS_* in .env')
  }
  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      name: name.trim(),
      email: email.trim(),
      topic: topic.trim() || '—',
      message: message.trim(),
      time: new Date().toLocaleString(),
    },
    { publicKey: PUBLIC_KEY },
  )
}

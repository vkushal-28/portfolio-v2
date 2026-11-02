export type ContactMessage = {
  name: string
  email: string
  topic: string
  message: string
}

/**
 * Sends a contact-form message.
 *
 * TODO: wire up a real transport — Formspree, EmailJS or a serverless endpoint
 * (e.g. a Vercel/Netlify function that relays to email). Until then this only simulates latency.
 */
export async function sendMessage(message: ContactMessage): Promise<void> {
  void message
  await new Promise((resolve) => setTimeout(resolve, 600))
}

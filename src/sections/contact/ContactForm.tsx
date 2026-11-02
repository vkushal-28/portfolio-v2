import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Check } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ease, spring } from '@/components/motion'
import { Button, Card, Field } from '@/components/ui'
import { contact } from '@/data'
import { sendMessage, type ContactMessage } from '@/lib/contact'

type FieldName = keyof ContactMessage
type Errors = Partial<Record<FieldName, string>>
type Status = 'idle' | 'sending' | 'sent' | 'failed'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const empty: ContactMessage = { name: '', email: '', topic: '', message: '' }
const { form, success } = contact

function validate(values: ContactMessage): Errors {
  const errors: Errors = {}
  if (!values.name.trim()) errors.name = form.errors.name
  if (!values.email.trim()) errors.email = form.errors.emailMissing
  else if (!EMAIL.test(values.email.trim())) errors.email = form.errors.emailInvalid
  if (values.message.trim().length < 10) errors.message = form.errors.message
  return errors
}

/** Shown after sending; takes focus on mount so screen-reader and keyboard users land on it. */
function SuccessState() {
  const reduce = useReducedMotion()
  const headingRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => headingRef.current?.focus(), [])

  return (
    <motion.div
      role="status"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="flex min-h-[420px] flex-col items-center justify-center text-center"
    >
      <motion.span
        aria-hidden="true"
        initial={reduce ? false : { scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ ...spring, delay: 0.1 }}
        className="grid size-16 place-items-center rounded-full bg-ac text-bg shadow-glow-lg"
      >
        <Check className="size-7" strokeWidth={2.5} />
      </motion.span>
      <h3
        ref={headingRef}
        tabIndex={-1}
        className="mt-6 text-[clamp(26px,2.8vw,36px)] font-semibold tracking-[-0.035em] text-tx outline-none"
      >
        {success.title}
      </h3>
      <p className="mt-2 max-w-sm text-base text-mu">{success.body}</p>
    </motion.div>
  )
}

export function ContactForm() {
  const reduce = useReducedMotion()
  const [values, setValues] = useState<ContactMessage>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const update = (name: FieldName) => (value: string) => {
    setValues((v) => ({ ...v, [name]: value }))
    // Clear a field's error as soon as it becomes valid.
    if (errors[name])
      setErrors((e) => ({ ...e, [name]: validate({ ...values, [name]: value })[name] }))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    const first = (Object.keys(found) as FieldName[])[0]
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`#contact-${first}`)?.focus()
      return
    }
    setStatus('sending')
    try {
      await sendMessage(values)
      setStatus('sent')
    } catch {
      setStatus('failed')
    }
  }

  const field = (name: FieldName) => ({
    id: `contact-${name}`,
    name,
    label: form.fields[name].label,
    placeholder: form.fields[name].placeholder,
    value: values[name],
    error: errors[name],
  })

  return (
    <Card className="relative overflow-hidden rounded-bento bg-s1/70 p-6 backdrop-blur-md md:p-9">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'sent' ? (
          <SuccessState key="success" />
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            aria-label={form.label}
            noValidate
            onSubmit={onSubmit}
            exit={reduce ? undefined : { opacity: 0, y: -12, transition: { duration: 0.3 } }}
            className="flex flex-col gap-7"
          >
            <div className="grid gap-7 sm:grid-cols-2">
              <Field
                {...field('name')}
                autoComplete="name"
                onChange={(e) => update('name')(e.target.value)}
              />
              <Field
                {...field('email')}
                type="email"
                autoComplete="email"
                onChange={(e) => update('email')(e.target.value)}
              />
            </div>
            <Field {...field('topic')} onChange={(e) => update('topic')(e.target.value)} />
            <Field
              {...field('message')}
              as="textarea"
              onChange={(e) => update('message')(e.target.value)}
            />
            {status === 'failed' && (
              <p role="alert" className="text-sm text-err">
                {form.errors.failed}
              </p>
            )}
            <Button
              type="submit"
              icon="arrow"
              disabled={status === 'sending'}
              className="self-start disabled:opacity-70"
            >
              {status === 'sending' ? form.sending : form.submit}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </Card>
  )
}

import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type BaseFieldProps = {
  label: string
  id: string
  /** Inline error; also sets `aria-invalid`. */
  error?: string
  className?: string
}

type InputFieldProps = BaseFieldProps & { as?: 'input' } & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'id' | 'className'
  >
type TextareaFieldProps = BaseFieldProps & { as: 'textarea' } & Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'id' | 'className'
  >

export type FieldProps = InputFieldProps | TextareaFieldProps

/** Labelled form control with a bottom border that turns lime on focus. */
export function Field({ label, id, error, className, ...props }: FieldProps) {
  const errorId = `${id}-error`
  const controlClass = cn(
    'w-full border-0 border-b bg-transparent py-3 text-base text-tx transition-colors duration-300 placeholder:text-mu3 focus:border-ac focus-visible:outline-none',
    error ? 'border-err' : 'border-ln3 hover:border-ln4',
  )
  const a11y = {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
  }

  let control: ReactNode
  if (props.as === 'textarea') {
    const { as, ...textarea } = props
    control = <textarea rows={5} className={cn(controlClass, 'resize-y')} {...textarea} {...a11y} />
  } else {
    const { as, ...input } = props
    control = <input className={controlClass} {...input} {...a11y} />
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="font-mono text-xs tracking-[0.1em] text-mu2 uppercase">
        {label}
      </label>
      {control}
      {error && (
        <p id={errorId} className="text-sm text-err">
          {error}
        </p>
      )}
    </div>
  )
}

import { motion, type HTMLMotionProps } from 'motion/react'
import { usePressMotion } from './interaction'

type AnchorProps = Omit<HTMLMotionProps<'a'>, 'href'> & { href: string }
type ButtonElementProps = HTMLMotionProps<'button'> & { href?: undefined }

/** `href` renders an `<a>`, otherwise a `<button type="button">`. */
export type PressableProps = AnchorProps | ButtonElementProps

/** Unstyled base for `Button` / `IconButton`: picks the element and adds the shared spring. */
export function Pressable(props: PressableProps) {
  const pressMotion = usePressMotion()
  if (props.href !== undefined) return <motion.a {...pressMotion} {...props} />
  const { type = 'button', ...rest } = props
  return <motion.button type={type} {...pressMotion} {...rest} />
}

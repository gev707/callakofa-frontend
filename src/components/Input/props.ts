import { ChangeEventHandler } from 'react'

export type Props = {
  name?: string
  value?: string | number
  onChange: ChangeEventHandler<HTMLInputElement>
  error?: string | Record<string, unknown>
  placeholder?: string
  label?: string
  required?: boolean
  type?: 'text' | 'password' | 'checkbox' | 'email' | 'number' | 'pin' | 'radio'
  className?: string
  maxLength?: number
  disabled?: boolean
  defaultValue?: string
  inputError?: string
  autoFocus?: boolean | string
  autoComplete?: boolean
  onFocus?: () => void
  onBlur?: () => void
  reset?: () => void
}

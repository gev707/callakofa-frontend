import classNames from 'classnames'
import { Input } from 'src/components/Input'
import { ChangeEventHandler, FC } from 'react'
import { pin_input, confirmation_pin_input } from './PinInput.module.css'

type Props = {
  value?: string
  onChange: ChangeEventHandler<HTMLInputElement>
  error?: string
  placeholder?: string
  confirm?: boolean
  name?: string
  autoFocus?: boolean | string
  label?: string
}

export const PinInput: FC<Props> = ({
  onChange,
  confirm,
  name,
  value,
  error,
  placeholder,
  autoFocus,
  label,
}) => {
  return (
    <Input
      label={label}
      name={name}
      maxLength={6}
      className={classNames(pin_input, {
        [confirmation_pin_input]: confirm,
      })}
      placeholder={placeholder || 'xxxxxx'}
      onChange={onChange}
      type="pin"
      value={value}
      error={error}
      autoFocus={autoFocus}
      autoComplete={false}
    />
  )
}

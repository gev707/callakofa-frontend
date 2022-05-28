import classNames from 'classnames'
import { ChangeEvent, FC } from 'react'
import {
  textarea,
  textarea_label,
  required_label,
  textarea_wrapper,
  error_message,
  invalid_textarea,
} from './style.module.css'

type Props = {
  value: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  name: string
  label?: string
  required?: boolean
  maxSymbols?: number
  error?: string
}

export const TextArea: FC<Props> = ({
  value,
  onChange,
  placeholder,
  name,
  label,
  required,
  maxSymbols,
  error,
}) => {
  return (
    <div className={textarea_wrapper}>
      {label && (
        <label
          htmlFor={name}
          className={classNames(textarea_label, { [required_label]: required })}
        >
          {label}
        </label>
      )}
      <textarea
        className={classNames(textarea, { [invalid_textarea]: error })}
        // className={textarea}
        value={value}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          if (maxSymbols && e.target.value.length >= maxSymbols) return
          onChange(e)
        }}
        placeholder={placeholder}
        name={name}
      />
      <span className={error_message}>{error}</span>
    </div>
  )
}

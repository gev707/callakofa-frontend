import { FC, useState } from 'react'
import { PasswordSwitchICO } from 'src/components/ICO/password-switch-ico'
import classNames from 'classnames'
import {
  input_container,
  input_wrapper,
  input_label,
  required_label,
  input,
  invalid_input,
  error_message,
  disabled_input,
  forgotE_label,
} from './style.module.css'
import { Props } from './props'
import InputReset from '../ICO/input-reset'

export const Input: FC<Props> = ({
  type = 'text',
  value,
  onChange,
  error = '',
  placeholder,
  label,
  required,
  name,
  className = '',
  maxLength,
  disabled,
  defaultValue,
  inputError,
  autoFocus,
  autoComplete,
  onFocus,
  onBlur,
  reset,
}) => {
  const [showPassword, setShowPassword] = useState(!(type === 'password'))
  const togglePasswordView = () => setShowPassword((prev) => !prev)

  let InputType = type
  if (type === 'password') InputType = showPassword ? 'text' : 'password'
  if (type === 'pin') InputType = 'password'

  return (
    <div className={input_container}>
      {label && (
        <label
          htmlFor={name}
          className={classNames(
            input_label,
            { [required_label]: required },
            { [forgotE_label]: placeholder === 'E-mail' }
          )}
        >
          {label}
        </label>
      )}

      <div
        className={classNames(input_wrapper, { [disabled_input]: disabled })}
      >
        <input
          disabled={disabled}
          id={name}
          maxLength={maxLength}
          name={name}
          type={InputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          autoFocus={typeof autoFocus === 'string' ? true : autoFocus}
          defaultValue={defaultValue}
          className={classNames(
            input,
            { [invalid_input]: error || inputError },
            className
          )}
          autoComplete={autoComplete ? 'on' : 'off'}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {type === 'password' && (
          <PasswordSwitchICO
            visible={showPassword}
            onClick={togglePasswordView}
          />
        )}
        {reset && <InputReset onClick={reset} />}
        <span className={error_message}>{error || inputError}</span>
      </div>
    </div>
  )
}

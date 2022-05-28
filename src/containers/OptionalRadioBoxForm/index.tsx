import classNames from 'classnames'
import { Input } from 'src/components/Input'
import { RadioBox } from 'src/components/Radio'
import { ChangeEvent } from 'react'
import {
  form,
  form_question,
  form_radios,
  label,
  input_wrapper,
  error_message,
  invalid_form,
} from './style.module.css'

interface IOptionalRadioForm {
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onRadioChange: (value: boolean) => void
  name: string
  questionLabel: string
  inputLabel?: string
  value: string | number
  answerState: boolean | undefined
  error?: string
  placeholder?: string
  inputError?: string
}

export const OptionalRadioForm = ({
  onInputChange,
  onRadioChange,
  name,
  questionLabel,
  inputLabel,
  value,
  answerState,
  error,
  placeholder,
  inputError,
}: IOptionalRadioForm) => {
  const answerSetter = (option: boolean) => {
    onRadioChange(option)
  }

  return (
    <div className={form}>
      <div className={classNames(form_question, { [invalid_form]: error })}>
        <span className={label}>{questionLabel}</span>
        <div className={form_radios}>
          <RadioBox
            name={name}
            option="Yes"
            onChange={() => answerSetter(true)}
            checked={!!answerState}
          />
          <RadioBox
            name={name}
            option="No"
            onChange={() => answerSetter(false)}
            checked={answerState === false}
          />
        </div>
      </div>
      <span className={error_message}>{error}</span>
      {answerState && (
        <div className={input_wrapper}>
          <Input
            onChange={onInputChange}
            name={name}
            label={inputLabel}
            value={value}
            placeholder={placeholder}
            inputError={inputError}
          />
        </div>
      )}
    </div>
  )
}

import { Input } from 'src/components/Input'
import { ChangeEvent, FC } from 'react'
import {
  phoneNumberForm_wrapper,
  input_margined,
  phoneNumber_header,
  inputs_wrapper,
} from './style.module.css'

const phoneNumberRegExp = '[^0-9]'

type Props = {
  changeStateCallback: (value: string, name: string) => void
  phoneCode: string
  error?: string
  formState: {
    phoneCode: string
    phoneNumber: number | string
  }
  personalDetailsStatePhone?: string
}

export const PhoneNumberForm: FC<Props> = ({
  changeStateCallback,
  phoneCode,
  error,
  formState,
  personalDetailsStatePhone,
}) => {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.name === 'phoneCode' &&
      e.target.value.slice(1).search(phoneNumberRegExp) !== -1
    )
      return
    if (
      e.target.name === 'phoneNumber' &&
      e.target.value.search(phoneNumberRegExp) !== -1
    )
      return

    if (e.target.name === 'phoneCode')
      changeStateCallback(e.target.value.slice(1), e.target.name)
    else changeStateCallback(e.target.value, e.target.name)
  }
  const arr = personalDetailsStatePhone?.split('-')
  const phoneLength = phoneCode?.length

  return (
    <div className={phoneNumberForm_wrapper}>
      <span className={phoneNumber_header}>Your Phone Number</span>
      <div className={inputs_wrapper}>
        <Input
          maxLength={+phoneLength + 1}
          name="phoneCode"
          onChange={handleInput}
          value={`+${formState.phoneCode}`}
          required
          placeholder={`+${phoneCode}`}
        />
        <Input
          name="phoneNumber"
          onChange={handleInput}
          className={input_margined}
          value={formState.phoneNumber}
          defaultValue={arr ? arr[1] : ''}
          placeholder="Enter Mobile Number"
          error={error}
          required
        />
      </div>
    </div>
  )
}

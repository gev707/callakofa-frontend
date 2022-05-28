import { ChangeEvent, useEffect, useState } from 'react'
import { H1 } from 'src/components/H1'
import { Button } from 'src/components/Button'
import { Input } from 'src/components/Input'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { useSelectorTyped } from 'src/utils/hooks'
import { RootState } from 'src/store'
import { getPasswordFromEmail } from 'src/store/actions/forgotpassword'
import { SignInLayout } from 'src/containers/Layouts/SignInLayout'

import {
  resetFetchingError,
  validateForm,
  startFetching,
  stopFetching,
} from 'src/store/reducers/forgotpassword'

import {
  form,
  form_buttons_wrapper,
  form_button,
} from './ForgotPasswordForm.module.css'

import { validate } from './validate'
import sentSuccessSvg from '../../../UI/forgotPassword.svg'

type FormState = string
export const ForgotPasswordForm = () => {
  const { errors } = useSelectorTyped(
    (state: RootState) => state.forgotPassword
  )
  const router = useRouter()

  const dispatch = useDispatch()

  const [email, setEmail] = useState<FormState>('')
  const [isSuccess, setIsSuccess] = useState(false)

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(resetFetchingError())
    if (e.target.name === 'email') {
      dispatch(validateForm({ errors: { email: '' } }))
    }
    setEmail(e.target.value.trim())
  }

  const sendEmail = () => {
    const { origin } = window.location
    dispatch(startFetching())
    const ValidationErrors = validate(email)

    if (ValidationErrors.email) {
      dispatch(validateForm({ errors: ValidationErrors }))
      dispatch(stopFetching())
      return
    }

    const payload = {
      body: {
        email,
        url: `${origin}/forgot_password/reset`,
        param: 'code',
      },
    }
    dispatch(getPasswordFromEmail(payload))
    setIsSuccess(true)
  }
  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault()
        sendEmail()
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [email])

  return (
    <SignInLayout>
      {!isSuccess ? (
        <div className={form}>
          <H1>Forgot your password ?</H1>
          <Input
            name="email"
            value={email}
            onChange={changeEmail}
            placeholder="E-mail"
            label="Enter your e-mail address below to reset your password."
            error={errors.email}
            autoFocus="true"
          />
          <div className={form_buttons_wrapper}>
            <Button
              className={form_button}
              onClick={() => router.push('/signin')}
              secondary
            >
              Back
            </Button>
            <Button className={form_button} onClick={sendEmail}>
              Submit
            </Button>
          </div>
        </div>
      ) : (
        <div className={form}>
          <img
            src={sentSuccessSvg}
            alt="Successfully sent"
            width="auto"
            height="auto"
          />
          <div className={form_buttons_wrapper}>
            <Button
              className={form_button}
              onClick={() => setIsSuccess(false)}
              secondary
            >
              Back
            </Button>
            <Button
              className={form_button}
              onClick={() => router.push('/signin')}
            >
              Sign in
            </Button>
          </div>
        </div>
      )}
    </SignInLayout>
  )
}

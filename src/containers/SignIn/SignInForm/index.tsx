import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { Button } from 'src/components/Button'
import is from 'is_js'
import { H1 } from 'src/components/H1'
import { Input } from 'src/components/Input'
import { LinkText } from 'src/components/LinkText'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { signInAction } from 'src/store/actions/signin'
import {
  startStageFetching,
  stopFetching,
  validateForm,
  resetFetchingError,
  resetToken,
} from 'src/store/reducers/signin'
import { useSelectorTyped } from 'src/utils/hooks'
import { ErrorsSpan } from 'src/components/ErrorsSpan'

import classNames from 'classnames'
import {
  form,
  form_inputs,
  form_password_actions,
  form_buttons,
  ico_button,
  account_lastRow,
} from './SignInForm.module.css'
import { validate } from './validate'
import { getAccessToken } from '../../../utils'
import { SignInLayout } from '../../Layouts/SignInLayout'
import { resetSignup } from '../../../store/reducers/signup'

type FormState = {
  username: string
  password: string
}

interface IReqData {
  password: string
  email?: string
  username?: string
}
const SignInForm: FC = () => {
  const { errors, fetching, fetchingErrors, data } = useSelectorTyped(
    (state) => state.signin
  )
  console.log(fetchingErrors)
  const [formState, setFormState] = useState<FormState>({
    username: '',
    password: '',
  })

  const dispatch = useDispatch()
  const router = useRouter()
  const firstUpdate = useRef(true)

  const submitForm = () => {
    dispatch(startStageFetching())
    const ValidationErrors = validate(formState)
    dispatch(validateForm({ errors: ValidationErrors }))

    if (!Object.values(ValidationErrors).every((elem) => elem === '')) {
      dispatch(stopFetching())
      return
    }
    const req: IReqData = {
      password: formState.password,
    }
    if (!is.email(formState.username)) {
      req.username = formState.username
    } else {
      req.email = formState.username
    }
    dispatch(signInAction(req))
  }

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault()
        submitForm()
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [formState.username, formState.password])

  const handleFormInput = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(resetFetchingError())
    if (e.target.name === 'username') {
      dispatch(validateForm({ errors: { username: '' } }))
    }

    if (e.target.name === 'password') {
      dispatch(validateForm({ errors: { password: '' } }))
    }

    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }))
  }

  useEffect(() => {
    if (getAccessToken()) {
      router.push('/profile')
      return
    }
    if (firstUpdate.current) {
      firstUpdate.current = false
      dispatch(resetSignup())
      dispatch(resetToken())
      return
    }
    if (data.accessToken) {
      router.push('/signup')
    }
  }, [data.accessToken])

  return (
    <SignInLayout>
      <div className={form}>
        <H1>Sign In</H1>

        <div className={classNames(form_inputs, account_lastRow)}>
          <Input
            name="username"
            placeholder="Username/Email"
            value={formState.username}
            onChange={handleFormInput}
            error={errors.username}
            autoFocus="true"
          />
          <Input
            name="password"
            placeholder="Password"
            value={formState.password}
            onChange={handleFormInput}
            type="password"
            error={errors.password}
          />
          {fetchingErrors && <ErrorsSpan>{fetchingErrors}</ErrorsSpan>}
        </div>

        <div className={form_password_actions}>
          <LinkText href="/forgot_password">Forgot your password ?</LinkText>
        </div>

        <div className={form_buttons}>
          <Button
            disabled={fetching}
            className={ico_button}
            onClick={submitForm}
          >
            Log In
          </Button>
          <Button onClick={() => router.push('/signup')}>
            Create an account
          </Button>
        </div>
      </div>
    </SignInLayout>
  )
}

export default SignInForm

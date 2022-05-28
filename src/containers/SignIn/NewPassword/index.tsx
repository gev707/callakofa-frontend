import { ChangeEvent, FC, useEffect, useState } from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { useSelectorTyped } from 'src/utils/hooks'
import {
  startFetching,
  validateForm,
  resetError,
  stopFetching,
  setIsPinOpened,
  resetFetchingError,
} from 'src/store/reducers/newPassword'
import { Button } from 'src/components/Button'
import { H1 } from 'src/components/H1'
import { Input } from 'src/components/Input'
import { ErrorsSpan } from 'src/components/ErrorsSpan'
import { SignInLayout } from 'src/containers/Layouts/SignInLayout'
import { useRouter } from 'next/router'
import { validate } from './validate'
import { form, form_buttons, link_expired } from './NewPasswordForm.module.css'
import { RootState } from '../../../store'
import { setNewPassword, verifyCode } from '../../../store/actions/newpassword'
import { PinInput } from '../../../components/PinInput'
import PasswordSuccessPopup from '../../../components/PopUps/password-succses-popup'
import { validatePin } from './validatePin'
import { haveErrors } from '../../../utils'

type FormState = {
  password: string
  passwordConfirmation: string
}

export const NewPasswordForm: FC = () => {
  const {
    errors,
    fetchingErrors,
    isCodeValid,
    isCodeChecked,
    isPinOpened,
    isPasswordChanged,
  } = useSelectorTyped((state: RootState) => state.newPassword)
  const dispatch = useDispatch()
  const router = useRouter()
  const [passwords, setPasswords] = useState<FormState>({
    password: '',
    passwordConfirmation: '',
  })

  const [securityCode, setSecurityCode] = useState<string>('')

  const handleFormInputs = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(resetError(e.target.name))
    setPasswords((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }))
  }

  const sendNewPassword = () => {
    dispatch(startFetching())
    const ValidationErrors = validatePin({ securityCode })
    dispatch(validateForm({ errors: ValidationErrors }))

    if (haveErrors(ValidationErrors)) {
      dispatch(stopFetching())
      return
    }

    const { code } = router.query
    if (!code) return
    const reqData = isPinOpened
      ? { ...passwords, securityCode }
      : { ...passwords }

    const req = {
      body: {
        code,
        ...reqData,
      },
    }

    dispatch(resetFetchingError())
    dispatch(setNewPassword(req))
  }

  const handlePin = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(resetFetchingError())
    dispatch(resetError(e.target.name))
    if (+e.target.value === 0 || e.target.value === '' || +e.target.value) {
      setSecurityCode(e.target.value.trim())
    }
  }

  const validatePasswords = () => {
    const { pin } = router.query
    dispatch(startFetching())
    const ValidationErrors = validate(passwords)
    dispatch(validateForm({ errors: ValidationErrors }))
    if (!Object.values(ValidationErrors).every((elem) => elem === '')) {
      dispatch(stopFetching())
    } else if (pin === 'true') {
      dispatch(setIsPinOpened(true))
    } else {
      sendNewPassword()
    }
  }

  useEffect(() => {
    const { code } = router.query
    if (!code) return
    const req = {
      payload: {
        body: {
          code,
        },
      },
    }
    dispatch(verifyCode(req))
  }, [])

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault()
        if (isPinOpened) {
          sendNewPassword()
        } else {
          validatePasswords()
        }
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [securityCode, passwords, isPinOpened])

  return (
    <SignInLayout>
      {isCodeChecked &&
        (isCodeValid ? (
          <div className={form}>
            {!isPinOpened ? (
              <>
                <H1 secondary>Enter new password</H1>
                <Input
                  name="password"
                  placeholder="New password"
                  type="password"
                  value={passwords.password}
                  onChange={handleFormInputs}
                  error={errors.password}
                />
                <Input
                  name="passwordConfirmation"
                  onChange={handleFormInputs}
                  placeholder="Retype New password"
                  type="password"
                  value={passwords.passwordConfirmation}
                  error={errors.passwordConfirmation}
                />
                {fetchingErrors && <ErrorsSpan>{fetchingErrors}</ErrorsSpan>}
                <div className={form_buttons}>
                  <Button onClick={validatePasswords}>Continue</Button>
                </div>
              </>
            ) : (
              <>
                <H1 secondary>Enter your security PIN?</H1>
                <PinInput
                  onChange={handlePin}
                  value={securityCode}
                  name="securityCode"
                  error={errors.securityCode || fetchingErrors}
                />
                <div className={form_buttons}>
                  <Button onClick={sendNewPassword}>Continue</Button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className={link_expired}>
            <h1>Recovery link is expired</h1>
            <Link href="/signin" passHref>
              <button>OK</button>
            </Link>
          </div>
        ))}
      {isPasswordChanged && <PasswordSuccessPopup />}
    </SignInLayout>
  )
}

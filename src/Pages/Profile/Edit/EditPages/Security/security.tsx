import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setErrorMessage } from '../../../../../store/ProfileDataStore/ProfileDataStore'
import { setIsFormFilled } from '../../../../../store/GlobalConfigDataStore/GlobalConfigDataStore'
import { ProfileManager } from '../../../../../managers/profile'
import { modalPromise } from '../../../../../helpers/modal-helper'
import {
  closePinModal,
  setShowPinModal,
  toggleAlertModal,
} from '../../../../../store/MainLayoutDataStore/MainLayoutDataStore'
import { Input } from '../../../../../components/Input'
import { validate } from './validate'
import MainLoader from '../../../../../components/Loaders/MainLoader'

export const Security: FC = () => {
  const dispatch = useDispatch()
  const [pageProps, setPageProps] = useState({
    loading: false,
  })
  const [inputValue, setInputValue] = useState({
    oldPassword: '',
    password: '',
    passwordConfirmation: '',
  })
  const [inputError, setInputError] = useState({
    oldPassword: '',
    password: '',
    passwordConfirmation: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputError({ ...inputError, [e.target.name]: '' })
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value.trim(),
    })
  }

  const resetValue = () => {
    setInputValue({
      oldPassword: '',
      password: '',
      passwordConfirmation: '',
    })
    setInputError({
      oldPassword: '',
      password: '',
      passwordConfirmation: '',
    })
    dispatch(setIsFormFilled(false))
  }

  const onSubmit = async () => {
    if (Object.values(inputValue).every((name: string) => name === '')) return
    const validateForm = validate(inputValue)
    setInputError({ ...validateForm })
    if (!Object.values(validateForm).every((name: string) => name === ''))
      return
    const promise = await modalPromise(({ resolve, reject }) =>
      dispatch(setShowPinModal({ resolve, reject }))
    )
    if (promise) {
      setPageProps({ loading: true })

      try {
        await ProfileManager.changePassword({
          ...inputValue,
          securityCode: promise,
        })
        dispatch(closePinModal())
        await dispatch(toggleAlertModal(true))
        resetValue()
      } catch (error: Record<string, unknown>) {
        const errors = error.data.errors[0]
        if (errors.property === 'securityCode') {
          dispatch(setErrorMessage(errors.messages[0]))
          await onSubmit()
        } else {
          setInputError({
            ...inputError,
            [errors.property]: errors.messages[0],
          })
        }
      }
    }
    setPageProps({ loading: false })
  }

  const isFormFilled = () => {
    return Object.values(inputValue).every((val: string) => val)
  }

  useEffect(() => {
    dispatch(
      setIsFormFilled(
        !Object.values(inputValue).every((name: string) => name === '')
      )
    )
  }, [inputValue])

  return (
    <div className="content">
      <div className="input-container">
        <div className="input-label">Current Password</div>
        <Input
          name="oldPassword"
          value={inputValue.oldPassword}
          onChange={handleChange}
          placeholder="************"
          type="password"
          error={inputError.oldPassword}
        />
        <div className="input-label">New Password</div>
        <Input
          name="password"
          value={inputValue.password}
          onChange={handleChange}
          placeholder="************"
          type="password"
          error={inputError.password}
        />
        <div className="input-label">Retype Password</div>
        <Input
          name="passwordConfirmation"
          value={inputValue.passwordConfirmation}
          onChange={handleChange}
          placeholder="************"
          type="password"
          error={inputError.passwordConfirmation}
        />
        <div className="btn-container">
          <button onClick={resetValue} className="btn-cancel">
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className={isFormFilled() ? 'btn-save' : 'btn-disable'}
            disabled={
              !inputValue.oldPassword ||
              !inputValue.password ||
              !inputValue.passwordConfirmation
            }
          >
            Save Changes
          </button>
        </div>
      </div>
      {pageProps.loading && <MainLoader />}
    </div>
  )
}

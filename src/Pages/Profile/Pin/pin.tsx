import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  setShowQuestionModal,
  toggleAlertModal,
} from '../../../store/MainLayoutDataStore/MainLayoutDataStore'
import { setErrorMessage } from '../../../store/ProfileDataStore/ProfileDataStore'
import { setIsFormFilled } from '../../../store/GlobalConfigDataStore/GlobalConfigDataStore'
import { modalPromise } from '../../../helpers/modal-helper'
import { ProfileManager } from '../../../managers/profile'
import { PinInput } from '../../../components/PinInput'
import { validate } from './validate'
import MainLoader from '../../../components/Loaders/MainLoader'

export const Pin: FC = () => {
  const [pageProps, setPageProps] = useState({ loading: false })

  const [inputValue, setInputValue] = useState({
    oldSecurityCode: '',
    securityCode: '',
    securityCodeRepeat: '',
  })
  const [inputError, setInputError] = useState({
    oldSecurityCode: '',
    securityCode: '',
    securityCodeRepeat: '',
  })

  const dispatch = useDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value === 0 || e.target.value === '' || +e.target.value) {
      setInputValue({
        ...inputValue,
        [e.target.name]: e.target.value.trim(),
      })
      setInputError({
        ...inputError,
        [e.target.name]: '',
      })
    }
  }

  const resetValue = () => {
    setInputValue({
      oldSecurityCode: '',
      securityCode: '',
      securityCodeRepeat: '',
    })
    setInputError({
      oldSecurityCode: '',
      securityCode: '',
      securityCodeRepeat: '',
    })
  }

  const onSave = async () => {
    if (Object.values(inputValue).every((name: string) => name === '')) return

    const validateForm = validate(inputValue)

    setInputError({ ...validateForm })

    if (!Object.values(validateForm).every((name: string) => name === ''))
      return

    const promise = await modalPromise(({ resolve, reject }) =>
      dispatch(setShowQuestionModal({ resolve, reject }))
    )

    if (promise) {
      setPageProps({ loading: true })
      try {
        await ProfileManager.changeSecurityPin({
          ...inputValue,
          securityQuestionAnswer: promise,
        })
        dispatch(toggleAlertModal(true))
        resetValue()
      } catch (error: Record<string, unknown>) {
        const errors = error.data.errors[0]
        if (errors.property === 'securityQuestionAnswer') {
          dispatch(setErrorMessage(errors.messages[0]))
          await onSave()
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
    if (Object.values(inputValue).every((name: string) => name === '')) {
      dispatch(setIsFormFilled(false))
    } else {
      dispatch(setIsFormFilled(true))
    }
  }, [inputValue])

  return (
    <div className="edit-container">
      <div className="sec-title">
        <span>CHANGE SECURITY PIN</span>
      </div>
      <hr />
      <div className="edit-holder">
        <div className="content">
          <div className="input-container">
            <div className="input-label">Existing PIN</div>
            <PinInput
              name="oldSecurityCode"
              value={inputValue.oldSecurityCode}
              onChange={handleChange}
              error={inputError.oldSecurityCode}
            />
            <div className="input-label">New PIN</div>
            <PinInput
              name="securityCode"
              value={inputValue.securityCode}
              onChange={handleChange}
              error={inputError.securityCode}
            />
            <div className="input-label">Retype PIN</div>
            <PinInput
              name="securityCodeRepeat"
              value={inputValue.securityCodeRepeat}
              onChange={handleChange}
              error={inputError.securityCodeRepeat}
            />
            <div className="btn-container">
              <button onClick={resetValue} className="btn-cancel">
                Cancel
              </button>
              <button
                onClick={onSave}
                className={isFormFilled() ? 'btn-save' : 'btn-disable'}
                disabled={
                  !inputValue.securityCodeRepeat ||
                  !inputValue.securityCode ||
                  !inputValue.oldSecurityCode
                }
              >
                Submit
              </button>
            </div>
          </div>
          {pageProps.loading && <MainLoader />}
        </div>
      </div>
    </div>
  )
}

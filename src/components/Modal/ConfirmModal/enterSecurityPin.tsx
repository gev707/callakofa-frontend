import { ChangeEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import ArrowNextIcon from '../../../assets/images/icons/arrow-next-icon'
import { closePinModal } from '../../../store/MainLayoutDataStore/MainLayoutDataStore'
import { PinInput } from '../../PinInput'
import { useSelectorTyped } from '../../../utils/hooks'
import { RootState } from '../../../store'
import CloseIcon from '../../../assets/images/icons/close-icon'
import { enterSecurityPinValidation } from './enterSecurityPinValidation'
import { setErrorMessage } from '../../../store/ProfileDataStore/ProfileDataStore'

export const EnterSecurityPin: FC = () => {
  const { promiseInfo } = useSelectorTyped(
    (state: RootState) => state.MainLayoutDataStore
  )
  const { errorMessage } = useSelectorTyped(
    (state: RootState) => state.ProfileDataStore
  )

  const [pin, setPin] = useState<string>('')
  const [pinError, setPinError] = useState<string>('')
  const dispatch = useDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value === 0 || e.target.value === '' || +e.target.value) {
      dispatch(setErrorMessage(''))
      setPinError('')
      setPin(e.target.value)
    }
  }

  const resolve = (value: string) => {
    promiseInfo.resolve(value)
  }

  const onSave = async () => {
    const validationErrors = enterSecurityPinValidation(pin)
    if (validationErrors) {
      setPinError(validationErrors)
      return
    }
    resolve(pin)
    dispatch(closePinModal())
    dispatch(setErrorMessage(''))
  }

  return (
    <div className="modal-container">
      <div className="pin">
        <span
          className="closeModal"
          onClick={() => {
            dispatch(closePinModal())
            dispatch(setErrorMessage(''))
            resolve('')
          }}
          aria-hidden
        >
          <CloseIcon />
        </span>
        <div className="pin-holder">
          <p>Enter Security PIN</p>
          <div className="input-holder">
            <PinInput
              value={pin}
              onChange={handleChange}
              error={pinError || errorMessage}
            />
            <button className="pin-btn" onClick={onSave}>
              Continue{' '}
              <span>
                <ArrowNextIcon />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

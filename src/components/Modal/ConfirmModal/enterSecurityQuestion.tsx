import { ChangeEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import ArrowNextIcon from '../../../assets/images/icons/arrow-next-icon'
import { closeQuestionModal } from '../../../store/MainLayoutDataStore/MainLayoutDataStore'
import CloseIcon from '../../../assets/images/icons/close-icon'
import { useSelectorTyped } from '../../../utils/hooks'
import { RootState } from '../../../store'
import { setErrorMessage } from '../../../store/ProfileDataStore/ProfileDataStore'
import { enterSecurityQuestionValidation } from './enterSecurityQuestionValidation'
import { Input } from '../../Input'

const questions: Record<string, string> = {
  FIRST_PET_NAME: 'Enter the name of your first pet',
}

export const EnterSecurityQuestion: FC = () => {
  const { promiseInfo, userData } = useSelectorTyped(
    (state: RootState) => state.MainLayoutDataStore
  )
  const { errorMessage } = useSelectorTyped(
    (state: RootState) => state.ProfileDataStore
  )
  const [answer, setAnswer] = useState('')

  const [answerError, setAnswerError] = useState('')

  const dispatch = useDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setErrorMessage(''))
    setAnswerError('')
    setAnswer(e.target.value)
  }

  const resolve = (value: string) => {
    promiseInfo.resolve(value)
  }
  const onSave = async () => {
    const validationErrors = enterSecurityQuestionValidation(answer)
    if (validationErrors) {
      setAnswerError(validationErrors)
      return
    }
    resolve(answer)
    dispatch(closeQuestionModal())
  }

  return (
    <div className="modal-container">
      <div className="security-question__modal">
        <span
          className="closeModal"
          onClick={() => {
            resolve('')
            dispatch(closeQuestionModal())
            dispatch(setErrorMessage(''))
          }}
          aria-hidden
        >
          <CloseIcon />
        </span>
        <div className="pin-holder">
          <p>Security Question</p>
          <span className="span">{questions[userData.question]}</span>
          <div className="input-holder">
            <Input
              className="pin-input"
              value={answer}
              onChange={handleChange}
              placeholder="Security response"
              error={answerError || errorMessage}
            />
            <button
              className={answer ? 'pin-btn' : 'pin-btn_disabled'}
              onClick={onSave}
              disabled={!answer}
            >
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

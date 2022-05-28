import { ChangeEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import ArrowNextIcon from '../../../assets/images/icons/arrow-next-icon'
import { setShowPropmtModal } from '../../../store/MainLayoutDataStore/MainLayoutDataStore'
import CloseIcon from '../../../assets/images/icons/close-icon'

const PromptModal: FC = () => {
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()
  const confirmTokken = () => {
    if (!Object.values(inputValue).every((value: string) => value === '')) {
      dispatch(setShowPropmtModal(false))
    }
  }
  return (
    <div className="modal-container">
      <div className="from-pin">
        <span
          className="closeModal"
          onClick={() => dispatch(setShowPropmtModal(false))}
          aria-hidden
        >
          <CloseIcon />
        </span>
        <div className="pin-modal">
          <p>Security Question</p>
          <span>Enter the name of your first pet*</span>
          <div className="input-holder">
            <input
              className="pin-input"
              placeholder="admin"
              value={inputValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInputValue(e.target.value)
              }
            />
            <button className="pin-btn" onClick={confirmTokken}>
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
export default PromptModal

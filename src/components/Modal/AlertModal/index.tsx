import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { toggleAlertModal } from '../../../store/MainLayoutDataStore/MainLayoutDataStore'

export const AlertModal: FC = () => {
  const dispatch = useDispatch()
  const closeAlertModal = () => {
    dispatch(toggleAlertModal(false))
  }
  return (
    <div className="modal-container">
      <div className="modal">
        <div className="social-modal">
          <p>Your changes were successfully saved</p>
          <button onClick={closeAlertModal} className="btn-save">
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

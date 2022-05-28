import { FC } from 'react'
import { useSelectorTyped } from '../../../utils/hooks'
import { RootState } from '../../../store'

export const ConfirmModal: FC = () => {
  const { promiseInfo } = useSelectorTyped(
    (state: RootState) => state.MainLayoutDataStore
  )
  const resolve = () => {
    promiseInfo.resolve(true)
  }
  const reject = () => {
    promiseInfo.resolve(false)
  }

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="social-modal">
          <p>All the unsaved changes will be lost</p>
          <button className="btn-cancel" onClick={reject}>
            Cancel
          </button>
          <button onClick={resolve} className="btn-save">
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

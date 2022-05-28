import { confirmRow } from './style.module.css'
import greenCheck from '../../assets/images/green-check.svg'
import redX from '../../assets/images/red-x.svg'

interface IConfirmRow {
  rowName: string
  rowValue?: string | boolean | undefined
  confirm?: boolean | undefined
}

export const ConfirmRow = ({ rowName, rowValue, confirm }: IConfirmRow) => {
  return (
    <div className={confirmRow}>
      <p>{rowName}</p>
      {rowValue && <span>{rowValue}</span>}
      {confirm ? (
        <img src={greenCheck} alt="greenCheck" />
      ) : (
        confirm === false && <img src={redX} alt="redX" />
      )}
    </div>
  )
}

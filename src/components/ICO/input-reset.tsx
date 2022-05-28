import classNames from 'classnames'
import CloseIcon from '../../assets/images/icons/close-icon'

interface IInputReset {
  className?: string
  onClick: () => void
}

const InputReset = ({ className, onClick }: IInputReset) => {
  return (
    <span
      className={classNames('reset', { [`${className}`]: className })}
      onClick={onClick}
      aria-hidden
    >
      <CloseIcon />
    </span>
  )
}

export default InputReset

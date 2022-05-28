import { FC } from 'react'
import { radioBox_wrapper, radioBox, label } from './style.module.css'

type Props = {
  option: string
  onChange: () => void
  name: string
  checked: boolean
}

export const RadioBox: FC<Props> = ({ onChange, option, name, checked }) => {
  return (
    <div className={radioBox_wrapper}>
      <label className={label} htmlFor={name + option}>
        <input
          name={name}
          type="radio"
          className={radioBox}
          onChange={onChange}
          checked={checked}
          id={name + option}
        />
        <span>{option}</span>
      </label>
    </div>
  )
}

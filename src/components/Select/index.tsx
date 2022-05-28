import classNames from 'classnames'
import { FC, useEffect, useRef, useState } from 'react'
import {
  select,
  select_wrapper,
  select_header,
  select_item,
  empty_header,
  opened,
  select_label,
  required_label,
  select_list,
  disabled_select,
  error_message,
  invalid_select,
  openSelectIco,
} from './style.module.css'

type Props = {
  options: Array<string>
  currentOption: string | number
  setCurrentOption: (option: string) => void
  placeholder: string
  label?: string
  required?: boolean
  disabled?: boolean
  error?: string
}

export const Select: FC<Props> = ({
  options,
  currentOption,
  setCurrentOption,
  placeholder,
  label,
  required,
  disabled,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectComponent = useRef<HTMLDivElement>(null)
  const myRef = useRef<SVGSVGElement>(null)
  useEffect(() => {
    const clickedOutside = (e: MouseEvent) => {
      if (
        selectComponent.current &&
        isOpen &&
        !selectComponent.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', clickedOutside)

    return () => document.addEventListener('mousedown', clickedOutside)
  })

  const toggleIsOpen = () => setIsOpen((prev) => !prev)
  const handleOptionsChange = (option: string) => {
    setCurrentOption(option)
    toggleIsOpen()
  }

  return (
    <div className={select_wrapper}>
      {label && (
        <span className={`${select_label} ${required ? required_label : ''}`}>
          {label}
        </span>
      )}
      <div
        className={classNames(select, {
          [opened]: isOpen,
          [disabled_select]: disabled,
          [invalid_select]: error,
        })}
        ref={selectComponent}
      >
        <p
          className={classNames(select_header, select_item, {
            [empty_header]: !currentOption,
          })}
          onClick={toggleIsOpen}
          aria-hidden
        >
          {currentOption || placeholder}
        </p>

        {isOpen && (
          <ul className={select_list}>
            {options.map((option) => (
              <li
                key={option}
                className={select_item}
                onClick={() => handleOptionsChange(option)}
                aria-hidden
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
      <svg
        ref={myRef}
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={isOpen ? openSelectIco : ''}
      >
        <path
          d="M5.3902 5.7779L9.84025 1.32777C9.94325 1.22485 10 1.08745 10 0.940948C10 0.794445 9.94325 0.657048 9.84025 0.554122L9.51261 0.226401C9.29911 0.0131508 8.95212 0.0131508 8.73895 0.226401L5.00207 3.96328L1.26105 0.222254C1.15804 0.119328 1.02072 0.0624996 0.874303 0.0624996C0.727719 0.0624996 0.590403 0.119328 0.487314 0.222254L0.159756 0.549975C0.0567484 0.652983 1.87554e-06 0.790299 1.86913e-06 0.936802C1.86273e-06 1.0833 0.0567483 1.2207 0.159756 1.32363L4.61387 5.7779C4.7172 5.88107 4.85516 5.93774 5.00183 5.93741C5.14906 5.93774 5.28695 5.88107 5.3902 5.7779Z"
          fill="black"
        />
      </svg>
      <span className={error_message}>{error}</span>
    </div>
  )
}

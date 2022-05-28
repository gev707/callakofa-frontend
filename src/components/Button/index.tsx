import { FC, MouseEventHandler } from 'react'
import classNames from 'classnames'
import { button, disabled_button, secondary_button } from './style.module.css'

type Props = {
  className?: string
  disabled?: boolean
  secondary?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset' | undefined
  children?: JSX.Element | JSX.Element[] | string
}
export const Button: FC<Props> = ({
  children,
  className = '',
  disabled,
  secondary,
  onClick,
  type,
  ...others
}) => (
  <button
    type={type}
    onClick={onClick}
    className={classNames(
      button,
      { [className]: className },
      { [disabled_button]: disabled },
      { [secondary_button]: secondary }
    )}
    {...others}
  >
    {children}
  </button>
)

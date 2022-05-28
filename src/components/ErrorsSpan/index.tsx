import { FC } from 'react'
import { errors_span } from './style.module.css'

export const ErrorsSpan: FC = ({ children }) => {
  return <span className={errors_span}>{children}</span>
}

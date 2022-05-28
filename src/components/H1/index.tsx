import { FC } from 'react'
import classNames from 'classnames'
import { h1_primary, h1_secondary } from './style.module.css'

type Props = {
  children: string
  secondary?: boolean
}

export const H1: FC<Props> = ({ children, secondary }) => (
  <h1 className={classNames(h1_primary, { [h1_secondary]: secondary })}>
    {children}
  </h1>
)

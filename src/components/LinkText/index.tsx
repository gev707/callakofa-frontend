import { FC } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { link_text, secondary_linked } from './LinkText.module.css'

type Props = {
  children: string | JSX.Element
  href: string
  secondary?: boolean
}

export const LinkText: FC<Props> = ({ children, href, secondary }) => (
  <span className={classNames(link_text, { [secondary_linked]: secondary })}>
    <Link href={href}>{children}</Link>
  </span>
)

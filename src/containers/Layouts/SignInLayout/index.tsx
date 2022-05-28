import { Logo } from 'src/components/Logo'
import { FC, ReactNode } from 'react'
import { SideImage } from 'src/components/ICO/SignInSideImage'
import { login_page, form_wrapper, login_side_image } from './style.module.css'

export const SignInLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={login_page}>
      <Logo />
      <div className={form_wrapper}>{children}</div>
      <SideImage className={login_side_image} />
    </div>
  )
}

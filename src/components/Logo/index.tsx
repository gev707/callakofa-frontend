import { useRouter } from 'next/router'
import { LogoICO } from 'src/components/ICO/logo-ico'
import { FC } from 'react'
import { logo } from './Logo.module.css'

export const Logo: FC = () => {
  const router = useRouter()
  return <LogoICO onClick={() => router.push('/signin')} className={logo} />
}

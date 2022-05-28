import Link from 'next/link'
import { useEffect, KeyboardEvent } from 'react'
import { useRouter } from 'next/router'
import success_monochromatic from '../../assets/images/success_monochromatic.svg'
import { password_success_popup } from '../../containers/SignIn/NewPassword/NewPasswordForm.module.css'

const PasswordSuccessPopup = () => {
  const router = useRouter()

  const routhToSignIn = () => {
    router.push('/signin')
  }

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault()
        routhToSignIn()
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [])

  return (
    <div className={password_success_popup}>
      <div>
        <img src={success_monochromatic} alt="success monochromatic" />
        <h1>Password was updated successfully</h1>
        <Link href="/signin" passHref>
          <button>OK</button>
        </Link>
      </div>
    </div>
  )
}

export default PasswordSuccessPopup

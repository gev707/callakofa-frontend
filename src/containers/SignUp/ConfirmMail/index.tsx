import { FC } from 'react'
import { H1 } from 'src/components/H1'
import { form, check_email } from '../ConfirmInformation/style.module.css'

export const ConfirmMail: FC = () => {
  return (
    <div className={form}>
      <H1 secondary>Confirm Information</H1>
      <div className={check_email}>
        Check your email address to proceed with verification.
      </div>
    </div>
  )
}

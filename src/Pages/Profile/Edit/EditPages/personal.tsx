import { FC } from 'react'
import { useRouter } from 'next/router'

export const Personal: FC = () => {
  const router = useRouter()
  const changeRoute = () => {
    router.push('/support')
  }
  return (
    <div className="content">
      <div className="personal-paragraph">
        <p className="para">
          To make changes in your profile info please contact{' '}
          <span aria-hidden onClick={changeRoute} className="sup-span">
            support
          </span>
        </p>
      </div>
    </div>
  )
}

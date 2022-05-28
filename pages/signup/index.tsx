import { getAccessToken } from 'src/utils'
import { SignUpStages } from 'src/containers/Layouts/SignUpLayout'
import { AccountDetails } from 'src/containers/SignUp/AccountDetails'
import { CreateSecurityPin } from 'src/containers/SignUp/CreateSecurityPin'
import { SecurityQuestion } from 'src/containers/SignUp/SecurityQuestion'
import { FC, useEffect } from 'react'
import { PersonalDetails } from 'src/containers/SignUp/PersonalDetails'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { PaymentDetails } from '../../src/containers/SignUp/PaymentDetails'
import { ConfirmInformation } from '../../src/containers/SignUp/ConfirmInformation'
import { finishStage } from '../../src/store/reducers/signup'
import { IRegistrationStatus } from '../../src/interfaces/signin/signin'
import { useSelectorTyped } from '../../src/utils/hooks'
import { getGeoDetails } from '../../src/store/actions/signup'
import { requireAuthentication } from '../../HOC/requireAuthentication'
import { ConfirmMail } from '../../src/containers/SignUp/ConfirmMail'

const RegistrationPage: FC = () => {
  const { data } = useSelectorTyped((state) => state.signin)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    if (data.registrationStatus && data.accessToken) {
      const stepNames: Array<IRegistrationStatus> = [
        'securityCode',
        'securityQuestion',
        'profile',
        'wallet',
        'confirm',
      ]

      dispatch(finishStage())
      // eslint-disable-next-line no-restricted-syntax
      for (const step of stepNames) {
        if (data.registrationStatus[step]) {
          dispatch(finishStage())
        }
      }
      if (data.user.status === 'NOT_VERIFIED') {
        dispatch(finishStage())
      }
    }
  }, [data])

  useEffect(() => {
    dispatch(getGeoDetails())
  }, [])

  useEffect(() => {
    if (data.accessToken && getAccessToken()) {
      router.push('/profile')
    }
  }, [data.accessToken])

  return (
    <SignUpStages>
      <AccountDetails />
      <CreateSecurityPin />
      <SecurityQuestion />
      <PersonalDetails />
      <PaymentDetails />
      <ConfirmInformation />
      <ConfirmMail />
    </SignUpStages>
  )
}

export default RegistrationPage

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async () => {
    return {
      props: {},
    }
  }
)

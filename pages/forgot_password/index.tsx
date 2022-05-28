import { ForgotPasswordForm } from 'src/containers/SignIn/ForgotPassword'
import { GetServerSideProps } from 'next'
import { requireAuthentication } from '../../HOC/requireAuthentication'

const ForgotPasswordPage = () => <ForgotPasswordForm />

export default ForgotPasswordPage

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async () => {
    return {
      props: {},
    }
  }
)

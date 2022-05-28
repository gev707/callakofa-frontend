import SignInForm from 'src/containers/SignIn/SignInForm'
import { GetServerSideProps } from 'next'
import { requireAuthentication } from '../../HOC/requireAuthentication'

const LoginPage = () => <SignInForm />

export default LoginPage

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async () => {
    return {
      props: {},
    }
  }
)

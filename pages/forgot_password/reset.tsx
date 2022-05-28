import { NewPasswordForm } from 'src/containers/SignIn/NewPassword'
import { GetServerSideProps } from 'next'
import { requireAuthentication } from '../../HOC/requireAuthentication'

const newPasswordPage = () => <NewPasswordForm />

export default newPasswordPage

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async () => {
    return {
      props: {},
    }
  }
)

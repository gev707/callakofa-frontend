// eslint-disable-next-line unicorn/filename-case
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

export function requireAuthentication(gssp: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const { req } = ctx

    const notRequiredRouts = ['/signin', '/signup', '/forgot_password']

    if (req.cookies) {
      const token = req.cookies.accessToken
      if (token && req.url && notRequiredRouts.includes(req.url)) {
        return {
          redirect: {
            permanent: false,
            destination: '/profile',
          },
        }
      }
    }
    return gssp(ctx)
  }
}

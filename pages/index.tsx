// import { withAuth } from 'utils'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'

const IndexPage: FC = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/signin')
  })
  return (
    <div>
      <button
      // onClick={() =>
      //   dispatch(authorize({ login: 'jon', password: 'Jon@1234' })).then(
      //     ({ payload }: PayloadAction<UserData>) =>
      //       (document.cookie = `auth=${payload.access_token}; path=/`)
      //   )
      // }
      >
        авторизоваться
      </button>
      <button
        onClick={() => {
          router.push('/signup')
        }}
      >
        зарегистрироваться
      </button>
    </div>
  )
}

// export const getServerSideProps = withAuth()

export default IndexPage

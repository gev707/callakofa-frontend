import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getAccessToken } from '../src/utils'

const Custom404 = () => {
  const router = useRouter()

  useEffect(() => {
    if (getAccessToken()) {
      router.push('/profile')
    } else {
      router.push('/signin')
    }
  }, [])
  return ''
}

export default Custom404

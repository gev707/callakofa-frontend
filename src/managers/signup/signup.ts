import axios from 'axios'

export function sendVerificationCode(body: any) {
  return axios.post(
    process.env.NEXT_PUBLIC_API + '/api/account/registration/verify',
    body
  )
}

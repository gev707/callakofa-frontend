import axios from 'axios'

const LogIn = async (data: any) => {
  return await axios.post(`${process.env.NEXT_PUBLIC_API}/api/auth/login`, data)
}

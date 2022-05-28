import { UserAuthData, UserData } from 'src/interfaces'
import axios from '../index'

export const authorizeUser = (
  login: string,
  password: string
): Promise<UserData> =>
  axios.post(`/api/auth/login`, { login, password }).then(({ data }) => data)

export const registerUser = (user: UserAuthData) =>
  axios
    .post(`/api/users/register`, {
      login: user.login,
      email: user.email ? user.email : '',
      password: user.password,
    })
    .then(({ data }) => data)
    .catch((error) => console.log(error.message))

export const createUser = (verificationCode: string): Promise<UserData> =>
  axios.post(`/api/users`, { verificationCode }).then(({ data }) => data)

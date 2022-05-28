import { Action } from '../index'

interface IFormState {
  username?: string
  email?: string
  password: string
}
export const signInAction = ({
  username,
  email,
  password,
}: IFormState): Action => ({
  type: 'LOGIN_USER',
  payload: {
    username,
    email,
    password,
  },
})

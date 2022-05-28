import { SignUpState } from 'src/store/reducers/signup'
import { SignInState } from 'src/store/reducers/signin'
import { ForgotPasswordState } from 'src/store/reducers/forgotpassword'
import { NewPasswordState } from 'src/store/reducers/newPassword'

export interface UserData {
  accessToken: string
  user: User
}

export interface User {
  id: number
  accessToken: string
  login: string
  email: string
  createdAt: string
  updatedAt: string
  roles: number[]
}

export type UserAuthData = {
  login: string
  email?: string
  password: string
}

export type StateType = {
  signup: SignUpState
  signin: SignInState
  forgotPassword: ForgotPasswordState
  newPassword: NewPasswordState
}

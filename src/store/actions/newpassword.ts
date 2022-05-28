import { Action } from '../index'

interface INewPassword {
  body: {
    password: string
    passwordConfirmation: string
    code: string | string[]
    securityCode?: string
  }
}
interface IResetPasswordReq {
  payload: {
    body: {
      code: string | Array<string>
    }
  }
}
export const verifyCode = ({ payload }: IResetPasswordReq): Action => ({
  type: 'VERIFY_CODE',
  payload,
})

export const setNewPassword = ({ body }: INewPassword): Action => ({
  type: 'SET_NEW_PASSWORD',
  payload: { body },
})

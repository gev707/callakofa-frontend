import { Action } from '../index'

interface IForgotPassword {
  body: {
    email: string
    url: string
    param: string
  }
}

export const getPasswordFromEmail = ({ body }: IForgotPassword): Action => ({
  type: 'GET_PASSWORD_FROM_EMAIL',
  payload: { body },
})

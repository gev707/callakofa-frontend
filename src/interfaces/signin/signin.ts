export interface ISignInRes {
  accessToken: string
  registrationStatus: {
    confirm: boolean
    profile: boolean
    securityCode: boolean
    securityQuestion: boolean
    wallet: boolean
  }
  user: {
    email: string
    id: number
    status: string
    username: string
  }
}

export interface ISignInStore {
  errors: {
    username: string
    password: string
  }
  fetching: boolean
  fetchingErrors: string
  data: ISignInRes
}

export type IRegistrationStatus =
  | 'securityCode'
  | 'securityQuestion'
  | 'profile'
  | 'wallet'
  | 'confirm'

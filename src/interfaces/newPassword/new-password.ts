export interface INewPasswordStore {
  errors: {
    password: string
    passwordConfirmation: string
  }
  isCodeValid: boolean
  fetching: boolean
  isCodeChecked: boolean
  isPinOpened: boolean
  fetchingErrors: string
  isPasswordChanged: boolean
  // body: {
  //   password: string
  //   passwordConfirmation: string
  // }
}

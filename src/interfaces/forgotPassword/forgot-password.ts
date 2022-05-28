export interface IPasswordStore {
  errors: {
    email: string
  }
  fetching: boolean
  fetchingErrors: string
  body: {
    email: string
  }
}

import { createSlice } from 'node_modules/@reduxjs/toolkit/dist'
import { IPasswordStore } from 'src/interfaces/forgotPassword/forgot-password'

const initialState: IPasswordStore = {
  errors: {
    email: '',
  },
  fetching: false,
  fetchingErrors: '',
  body: {
    email: '',
  },
}
export type ForgotPasswordState = typeof initialState

const forgotPassword = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    resetFetchingError(state) {
      state.fetchingErrors = ''
    },
    startFetching(state) {
      state.fetching = true
    },
    validateForm(state, action) {
      state.errors = {
        ...state.errors,
        ...action.payload.errors,
      }
    },
    endFetching(state, action) {
      state.body = action.payload
      state.fetching = false
    },
    setFetchingErrors(state, action) {
      state.fetchingErrors = action.payload.response.data.message
    },
    stopFetching(state) {
      state.fetching = false
    },
  },
})

export const {
  validateForm,
  endFetching,
  startFetching,
  stopFetching,
  resetFetchingError,
  setFetchingErrors,
} = forgotPassword.actions

export default forgotPassword.reducer

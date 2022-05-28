import { createSlice } from 'node_modules/@reduxjs/toolkit/dist'
import { INewPasswordStore } from 'src/interfaces/newPassword/new-password'

const initialState: INewPasswordStore = {
  errors: {
    password: '',
    passwordConfirmation: '',
  },
  fetching: false,
  isCodeValid: false,
  isCodeChecked: false,
  isPinOpened: false,
  fetchingErrors: '',
  isPasswordChanged: false,
}

export type NewPasswordState = typeof initialState

const newPassword = createSlice({
  name: 'newPassword',
  initialState,
  reducers: {
    startFetching(state) {
      state.fetching = true
    },
    setIsPasswordChanged(state) {
      state.isPasswordChanged = true
    },
    validateForm(state, action) {
      state.errors = {
        ...state.errors,
        ...action.payload.errors,
      }
    },
    setIsPinOpened(state, action) {
      state.isPinOpened = action.payload
    },
    resetFetchingError(state) {
      state.fetchingErrors = ''
    },
    stopFetching(state) {
      state.fetching = false
    },
    resetError(state, action) {
      state.errors = {
        ...state.errors,
        [action.payload]: '',
      }
    },
    setIsCodeValid(state, action) {
      state.isCodeValid = action.payload
      state.isCodeChecked = true
    },
    setFetchingErrors(state, action) {
      state.fetchingErrors = `${action.payload.response.data.errors[0].messages[0]}`
    },
  },
})

export const {
  validateForm,
  startFetching,
  stopFetching,
  setFetchingErrors,
  resetError,
  setIsCodeValid,
  setIsPinOpened,
  resetFetchingError,
  setIsPasswordChanged,
} = newPassword.actions

export default newPassword.reducer

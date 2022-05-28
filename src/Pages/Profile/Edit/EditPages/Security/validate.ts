import is from 'is_js'

type FormState = {
  oldPassword: string
  password: string
  passwordConfirmation: string
}
type ErrorsObject = FormState

const lowerCaseRegExp = '[a-z]'
const upperCaseRegExp = '[A-Z]'
const digitRegExp = '[0-9]'

export const validate = ({
  oldPassword,
  password,
  passwordConfirmation,
}: FormState): ErrorsObject => {
  const errors = {
    oldPassword: '',
    password: '',
    passwordConfirmation: '',
  }

  if (
    is.empty(oldPassword) ||
    oldPassword.search(lowerCaseRegExp) === -1 ||
    oldPassword.search(upperCaseRegExp) === -1 ||
    oldPassword.search(digitRegExp) === -1
  ) {
    errors.oldPassword =
      'Password is not valid. It must include at least 1 uppercase letter, 1 lowercase letter and 1 digit'
  }

  if (oldPassword.length < 8) {
    errors.oldPassword = 'The value must not be less than 8 characters long'
  }

  if (oldPassword.length > 64) {
    errors.oldPassword = 'The value must not be more than 64 characters long'
  }
  if (
    is.empty(password) ||
    password.search(lowerCaseRegExp) === -1 ||
    password.search(upperCaseRegExp) === -1 ||
    password.search(digitRegExp) === -1
  ) {
    errors.password =
      'Password is not valid. It must include at least 1 uppercase letter, 1 lowercase letter and 1 digit'
  }
  if (password.length > 64) {
    errors.password = 'The value must not be more than 64 characters long'
  }

  if (password.length < 8) {
    errors.password = 'The value must not be less than 8 characters long'
  }

  if (
    is.empty(passwordConfirmation) ||
    password.search(lowerCaseRegExp) === -1 ||
    password.search(upperCaseRegExp) === -1 ||
    password.search(digitRegExp) === -1
  ) {
    errors.passwordConfirmation =
      'Password is not valid. It must include at least 1 uppercase letter, 1 lowercase letter and 1 digit'
  }
  if (password.length > 64) {
    errors.passwordConfirmation =
      'The value must not be more than 64 characters long'
  }

  if (password.length < 8) {
    errors.passwordConfirmation =
      'The value must not be less than 8 characters long'
  }
  if (passwordConfirmation !== password || errors.password) {
    errors.passwordConfirmation = 'Confirm Password Mismatch'
  }
  return errors
}

import is from 'is_js'

type FormState = {
  password: string
  passwordConfirmation: string
}
type ErrorsObject = FormState

const lowerCaseRegExp = '[a-z]'
const upperCaseRegExp = '[A-Z]'
const digitRegExp = '[0-9]'

export const validate = ({
  password,
  passwordConfirmation,
}: FormState): ErrorsObject => {
  const errors = {
    password: '',
    passwordConfirmation: '',
  }

  if (
    is.empty(password) ||
    password.search(lowerCaseRegExp) === -1 ||
    password.search(upperCaseRegExp) === -1 ||
    password.search(digitRegExp) === -1
  ) {
    errors.password =
      'Invalid Password: must include upper and lower case letters, digits'
  }
  if (password.length > 64) {
    errors.password = 'The value must not be more than 64 characters long'
  }

  if (password.length < 8) {
    errors.password = 'The value must not be less than 8 characters long'
  }

  if (passwordConfirmation !== password || errors.password) {
    errors.passwordConfirmation = 'Confirm Password Mismatch'
  }

  if (
    is.empty(passwordConfirmation) ||
    passwordConfirmation.search(lowerCaseRegExp) === -1 ||
    passwordConfirmation.search(upperCaseRegExp) === -1 ||
    passwordConfirmation.search(digitRegExp) === -1
  ) {
    errors.passwordConfirmation =
      'Invalid Password: must include upper and lower case letters, digits'
  }
  if (passwordConfirmation.length > 64) {
    errors.passwordConfirmation =
      'The value must not be more than 64 characters long'
  }

  if (passwordConfirmation.length < 8) {
    errors.passwordConfirmation =
      'The value must not be less than 8 characters long'
  }

  return errors
}

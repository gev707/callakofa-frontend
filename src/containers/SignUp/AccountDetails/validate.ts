import is from 'is_js'

type FormState = {
  username: string
  email: string
  password: string
  passwordConfirmation: string
}
type ErrorsObject = FormState

const usernameRegExp = '[^a-zA-Z0-9]' // not letter or digit
const lowerCaseRegExp = '[a-z]'
const upperCaseRegExp = '[A-Z]'
const digitRegExp = '[0-9]'

export const validate = ({
  username,
  password,
  email,
  passwordConfirmation,
}: FormState): ErrorsObject => {
  const errors = {
    username: '',
    password: '',
    email: '',
    passwordConfirmation: '',
  }

  if (username.search(usernameRegExp) !== -1) {
    errors.username = 'Allowed symbols: letters, digits'
  }
  if (username.length < 2) {
    errors.username = 'Minimal amount of characters is not reached'
  }

  if (username.length > 32) {
    errors.username = 'The value must not be more than 32 characters long'
  }

  if (is.empty(email) || !is.email(email)) {
    errors.email = 'Email format is not valid'
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

  if (passwordConfirmation !== password || errors.password) {
    errors.passwordConfirmation = 'Confirm Password Mismatch'
  }

  return errors
}

import is from 'is_js'

type FormState = {
  password: string
  passwordConfirmation: string
}
type ErrorsObject = FormState

export const validate = ({
  password,
  passwordConfirmation,
}: FormState): ErrorsObject => {
  const errors = {
    password: '',
    passwordConfirmation: '',
  }

  const lowerCaseRegExp = '[a-z]'
  const upperCaseRegExp = '[A-Z]'
  const digitRegExp = '[0-9]'

  if (
    (password && password.search(lowerCaseRegExp) === -1) ||
    password.search(upperCaseRegExp) === -1 ||
    password.search(digitRegExp) === -1
  ) {
    errors.password =
      'Password is not valid. It must include at least 1 uppercase letter, 1 lowercase letter and 1 digit'
  }

  if (is.empty(password)) {
    errors.password = 'Field is required'
  }

  if (!is.empty(password) && password.length < 8) {
    errors.password = 'The value must not be less than 8 characters longs'
  }

  if (password.length > 64)
    errors.password = 'The value must not be more than 64 characters long'

  if (password !== passwordConfirmation) {
    errors.passwordConfirmation = 'Confirm Password Mismatch'
  }

  if (is.empty(passwordConfirmation))
    errors.passwordConfirmation = 'Field is required'

  return errors
}

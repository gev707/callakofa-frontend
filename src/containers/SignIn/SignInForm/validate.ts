import is from 'is_js'

type FormState = {
  username: string
  password: string
}
type ErrorsObject = FormState

export const validate = ({ username, password }: FormState): ErrorsObject => {
  const errors = {
    username: '',
    password: '',
  }

  const lowerCaseRegExp = '[a-z]'
  const upperCaseRegExp = '[A-Z]'
  const digitRegExp = '[0-9]'

  // username
  if (!is.email(username)) {
    if (username.length > 0 && username.length < 2)
      errors.username = 'Minimal amount of characters is not reached'

    if (is.empty(username)) errors.username = 'Email/Username is required'

    if (username.length > 32)
      errors.username = 'The value must not be more than 32 characters long'
  }

  // password

  if (
    password.search(lowerCaseRegExp) === -1 ||
    password.search(upperCaseRegExp) === -1 ||
    password.search(digitRegExp) === -1
  ) {
    errors.password =
      'Password is not valid. It must include at least 1 uppercase letter, 1 lowercase letter and 1 digit'
  }

  if (password.length > 0 && password.length < 8)
    errors.password = 'The value must not be less than 8 characters long'

  if (is.empty(password)) errors.password = 'Password is required'

  if (password.length > 64)
    errors.password = 'The value must not be more than 64 characters long'

  return errors
}

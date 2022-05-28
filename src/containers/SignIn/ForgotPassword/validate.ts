import is from 'is_js'

type EmailFormState = string
type ErrorsObject = { email: EmailFormState }

export const validate = (email: EmailFormState): ErrorsObject => {
  const errors = {
    email: '',
  }

  if (!is.email(email)) {
    errors.email = 'Please enter valid email'
  }

  if (is.empty(email)) errors.email = 'E-mail is required'

  return errors
}

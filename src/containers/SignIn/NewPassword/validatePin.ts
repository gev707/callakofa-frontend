import is from 'is_js'

type FormState = {
  securityCode: string
}

type ErrorObject = FormState

export const validatePin = ({ securityCode }: FormState): ErrorObject => {
  const errors = { securityCode: '' }

  if (is.empty(securityCode) || securityCode.length < 6)
    errors.securityCode = "Security PIN can't be less than 6 digits"

  return errors
}

import is from 'is_js'

type FormState = {
  securityCode: string
  securityCodeRepeat: string
}
type ErrorsObject = FormState

const digitRegExp = '[0-9]'

export const validatePin = ({
  securityCode,
  securityCodeRepeat,
}: FormState): ErrorsObject => {
  const errors = {
    securityCode: '',
    securityCodeRepeat: '',
  }

  if (is.empty(securityCode) || securityCode.search(digitRegExp) === -1) {
    errors.securityCode = "Security PIN can't be less than 6 digits"
  }

  if (securityCode.length < 6) {
    errors.securityCode = 'Security PIN cant be less than 6 digits'
  }

  if (
    is.empty(securityCodeRepeat) ||
    securityCodeRepeat.search(digitRegExp) === -1
  ) {
    errors.securityCodeRepeat = 'Security PIN cant be less than 6 digits'
  }
  if (securityCodeRepeat !== securityCode) {
    errors.securityCodeRepeat = 'Confirm Security PIN Mismatch'
  }

  return errors
}

type FormState = {
  pin: string
  confirmPin: string
}

type ErrorObject = FormState

export const validate = ({ pin, confirmPin }: FormState): ErrorObject => {
  const errors = { pin: '', confirmPin: '' }

  if (pin.length !== 6) errors.pin = "Security PIN can't be less than 6 digits"

  if (errors.pin || pin !== confirmPin)
    errors.confirmPin = 'Confirm Security PIN Mismatch'

  if (confirmPin.length !== 6)
    errors.confirmPin = "Security PIN can't be less than 6 digits"

  return errors
}

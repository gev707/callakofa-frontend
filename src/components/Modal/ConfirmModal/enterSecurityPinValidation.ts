import is from 'is_js'

export const enterSecurityPinValidation = (pin: string) => {
  let error
  if (is.empty(pin) || pin.length < 6)
    error = "Security PIN can't be less than 6 digits"
  return error
}

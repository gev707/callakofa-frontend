import is from 'is_js'

export const validate = (
  answer: string,
  currentOption: string | undefined
): { answer: string } => {
  const errors = { answer: '' }
  if (is.empty(answer) || is.empty(currentOption))
    errors.answer = 'Security Question response cannot be empty'

  if (answer.length > 255) {
    errors.answer = 'The value must not be more than 255 characters long'
  }
  return errors
}

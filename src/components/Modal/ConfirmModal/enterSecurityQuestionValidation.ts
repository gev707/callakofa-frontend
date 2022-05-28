import is from 'is_js'

export const enterSecurityQuestionValidation = (answer: string) => {
  let error
  if (answer.length > 255)
    error = 'The value must not be more than 255 characters long'

  if (is.empty(answer)) error = "Security Answer can't be empty"
  return error
}

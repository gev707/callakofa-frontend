import is from 'is_js'

export const validate = (
  formState: Record<string, any>,
  phoneDate: Record<string, any>
): Record<string, string> => {
  const errorObject = {} as { [key: string]: string }
  for (const key of Object.keys(formState)) errorObject[key] = ''

  if (is.empty(formState.objective)) errorObject.objective = 'Field is required'

  if (formState.objectiveNote?.length > 512)
    errorObject.objectiveNote =
      'The value must not be more than 512 characters long'

  if (
    formState.firstName.length < 2 ||
    formState.firstName.length > 32 ||
    is.empty(formState.firstName)
  ) {
    errorObject.firstName =
      'Field is required, min is 2 and max is 32 characters'
  }
  if (
    formState.lastName.length < 2 ||
    formState.lastName.length > 32 ||
    is.empty(formState.lastName)
  ) {
    errorObject.lastName =
      'Field is required, min is 2 and max is 32 characters'
  }

  if (is.empty(phoneDate.phoneCode) || is.empty(phoneDate.phoneNumber))
    errorObject.phone = 'Field is required and should contain only digits'

  if (is.empty(formState.address)) errorObject.address = 'Field is required'
  if (formState.address.length > 255)
    errorObject.address = 'The value must not be more than 255 characters long'

  if (!Object.values(formState.dateOfBirth).every((value) => value))
    errorObject.dateOfBirth = 'Field is required'

  if (is.empty(formState.maritalStatus))
    errorObject.maritalStatus = 'Field is required'

  /// currentlyEmployed

  if (formState.currentlyEmployed === undefined)
    errorObject.currentlyEmployed = 'Field is required'

  if (formState.currentlyEmployed) {
    if (is.empty(formState.jobTitle)) errorObject.jobTitle = 'Field is required'

    if (is.empty(formState.jobDescription))
      errorObject.jobDescription = 'Field is required'

    if (is.empty(formState.employeeAddress))
      errorObject.employeeAddress = 'Field is required'
  }

  /// businessOwner

  if (formState.businessOwner === undefined)
    errorObject.businessOwner = 'Field is required'

  if (formState.businessOwner && is.empty(formState.businessDescription))
    errorObject.businessDescription = 'Field is required'

  /// anyTrade

  if (formState.anyTrade === undefined) errorObject.anyTrade = 'Field Required'
  if (formState.anyTrade && is.empty(formState.tradeDescription))
    errorObject.tradeDescription = 'Field is required'

  /// anyTechnicalSkills

  if (formState.anyTechnicalSkills === undefined)
    errorObject.anyTechnicalSkills = 'Field is required'

  if (
    formState.anyTechnicalSkills &&
    is.empty(formState.technicalSkillsDescription)
  )
    errorObject.technicalSkillsDescription = 'Field is required'

  /// anyAthleticSkills

  if (formState.anyAthleticSkills === undefined)
    errorObject.anyAthleticSkills = 'Field is required'

  if (
    formState.anyAthleticSkills &&
    is.empty(formState.athleticSkillsDescription)
  )
    errorObject.athleticSkillsDescription = 'Field is required'

  /// anyDependents

  if (formState.anyDependents === undefined)
    errorObject.anyDependents = 'Field Required and should contain only digits'

  if (formState.anyDependents && is.empty(formState.totalNumberOfDependens))
    errorObject.totalNumberOfDependens = 'Field is required '

  if (formState.anyDependents && formState.totalNumberOfDependens <= 0)
    errorObject.totalNumberOfDependens = 'Fill correct digits'

  if (
    formState.anyDependents &&
    !/^\d+$/.test(formState.totalNumberOfDependens)
  )
    errorObject.totalNumberOfDependens = 'Fill correct digits'

  /// beneficiary

  if (
    is.empty(formState.beneficiaryName) ||
    formState.beneficiaryName.length < 2
  )
    errorObject.beneficiaryName =
      'Field is required, the value must not be less than 2 characters long'

  if (formState.beneficiaryName.length > 32)
    errorObject.beneficiaryName =
      'The value must not be more than 32 characters long'

  if (
    formState.beneficiaryRelationship.length < 2 ||
    is.empty(formState.beneficiaryRelationship)
  )
    errorObject.beneficiaryRelationship =
      'Field is required, the value must not be less than 2 characters long'

  if (formState.beneficiaryRelationship.length > 32)
    errorObject.beneficiaryRelationship =
      'The value must not be more than 32 characters long'

  if (
    formState.beneficiaryContactNumber.length < 2 ||
    formState.beneficiaryContactNumber.length > 32 ||
    is.empty(formState.beneficiaryContactNumber)
  )
    errorObject.beneficiaryContactNumber =
      'Field is required, min is 2 and max is 32 characters and should contain only digits'

  /// stateId  cityId

  if (formState.stateId === undefined) errorObject.stateId = 'Field is required'
  if (
    is.empty(formState.city) ||
    formState.city.length < 2 ||
    formState.city.length > 32
  )
    errorObject.city = 'Field is required, min is 2 and max is 32 characters'

  return errorObject
}

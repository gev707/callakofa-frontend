import is from 'is_js'

export const validate = (
  formState: Record<string, any>,
  phoneDate: Record<string, any>
): Record<string, string> => {
  const errorData = {} as { [key: string]: string }

  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(formState)) errorData[key] = ''

  // email validation
  if (is.empty(formState.email) || !is.email(formState.email)) {
    errorData.email = 'Email format is not valid'
  }

  // objective validation
  if (is.empty(formState.objective)) errorData.objective = 'Field is required'

  // objectiveNote validation
  if (formState.objectiveNote?.length > 512)
    errorData.objectiveNote =
      'The value must not be more than 512 characters long'

  // firstName validation
  if (formState.firstName.length < 2) {
    errorData.firstName = 'The value must not be less than 2 characters long'
  }

  if (formState.firstName.length > 32) {
    errorData.firstName = 'The value must not be more than 32 characters long'
  }

  // lastName validation
  if (formState.lastName.length < 2) {
    errorData.lastName = 'The value must not be less than 2 characters long'
  }

  if (formState.lastName.length > 32) {
    errorData.lastName = 'The value must not be more than 32 characters long'
  }

  // phone validation
  if (is.empty(formState.phone)) errorData.phone = 'Field is required'
  if (is.empty(phoneDate.phoneCode) || is.empty(phoneDate.phoneNumber))
    errorData.phone = 'Field is required and should contain only digits'

  // address validation
  if (formState.address.length < 2)
    errorData.address =
      'Field is required, the value must not be less than 2 characters long'

  if (formState.address.length > 255)
    errorData.address = 'The value must not be more than 255 characters long'

  // dateOfBirth validation
  if (!Object.values(formState.dateOfBirth).every((value) => value))
    errorData.dateOfBirth = 'Field is required'

  // maritalStatus validation
  if (is.empty(formState.maritalStatus))
    errorData.maritalStatus = 'Field is required'

  // currentlyEmployed validation
  if (formState.currentlyEmployed === undefined)
    errorData.currentlyEmployed = 'Field is required'

  if (formState.currentlyEmployed) {
    if (is.empty(formState.jobTitle) || formState.jobTitle === null)
      errorData.jobTitle = 'Field is required'

    if (is.empty(formState.jobDescription) || formState.jobDescription === null)
      errorData.jobDescription = 'Field is required'

    if (
      is.empty(formState.employeeAddress) ||
      formState.employeeAddress === null
    )
      errorData.employeeAddress = 'Field is required'
  }

  /// businessOwner
  if (formState.businessOwner === undefined)
    errorData.businessOwner = 'Field is required'

  if (
    formState.businessOwner &&
    (is.empty(formState.businessDescription) ||
      formState.businessDescription === null)
  )
    errorData.businessDescription = 'Field is required'

  /// anyTrade
  if (formState.anyTrade === undefined) errorData.anyTrade = 'Field Required'

  if (
    formState.anyTrade &&
    (is.empty(formState.tradeDescription) ||
      formState.tradeDescription === null)
  )
    errorData.tradeDescription = 'Field is required'

  /// anyTechnicalSkills
  if (formState.anyTechnicalSkills === undefined)
    errorData.anyTechnicalSkills = 'Field is required'

  if (
    formState.anyTechnicalSkills &&
    (is.empty(formState.technicalSkillsDescription) ||
      formState.technicalSkillsDescription === null)
  )
    errorData.technicalSkillsDescription = 'Field is required'

  /// anyAthleticSkills
  if (formState.anyAthleticSkills === undefined)
    errorData.anyAthleticSkills = 'Field is required'

  if (
    formState.anyAthleticSkills &&
    (is.empty(formState.athleticSkillsDescription) ||
      formState.athleticSkillsDescription === null)
  )
    errorData.athleticSkillsDescription = 'Field is required'

  // anyDependents
  if (formState.anyDependents === undefined)
    errorData.anyDependents = 'Field is required'

  if (
    formState.anyDependents &&
    (is.empty(formState.totalNumberOfDependens) ||
      formState.totalNumberOfDependens <= 0 ||
      !/^\d+$/.test(formState.totalNumberOfDependens) ||
      formState.totalNumberOfDependens === null)
  )
    errorData.totalNumberOfDependens = 'Fill correct digits'

  // beneficiary
  if (
    is.empty(formState.beneficiaryName) ||
    formState.beneficiaryName.length < 2
  )
    errorData.beneficiaryName =
      'Field is required, the value must not be less than 2 characters long'

  if (formState.beneficiaryName.length > 32)
    errorData.beneficiaryName =
      'The value must not be more than 32 characters long'

  // beneficiaryRelationship
  if (
    is.empty(formState.beneficiaryRelationship) ||
    formState.beneficiaryRelationship.length < 2
  )
    errorData.beneficiaryRelationship =
      'The value must not be less than 2 characters long'

  if (formState.beneficiaryRelationship.length > 32)
    errorData.beneficiaryRelationship =
      'The value must not be more than 32 characters long'

  // beneficiaryContactNumber
  if (
    formState.beneficiaryContactNumber.length < 2 ||
    formState.beneficiaryContactNumber.length > 32 ||
    is.empty(formState.beneficiaryContactNumber)
  )
    errorData.beneficiaryContactNumber =
      'Field is required and should contain only digits'

  //  cityId
  if (formState.stateId === undefined || !formState.stateId)
    errorData.stateId = 'Field is required'

  // stateId
  if (formState.countryId === undefined)
    errorData.countryId = 'Field is required'

  // city
  if (
    is.empty(formState.city) ||
    formState.city.length < 2 ||
    formState.city.length > 32
  )
    errorData.city = 'Field is required, min is 2 and max is 32 characters'

  return errorData
}

import { RegistrationAction } from '../index'

type RegistrationBody = {
  username: string
  email: string
  password: string
  passwordConfirmation: string
}

type SecurityQuestionState = {
  question: string
  answer: string
}

type PinFormState = {
  pin: string
  confirmPin: string
}

export const registerAction = ({
  username,
  email,
  password,
  passwordConfirmation,
}: RegistrationBody): RegistrationAction => ({
  type: 'COMPLETE_STAGE',
  apiUrl: `/api/account/registration`,
  payload: {
    body: {
      username,
      email,
      password,
      passwordConfirmation,
    },
  },
})

export const sendPinAction = ({
  pin: securityCode,
  confirmPin: securityCodeConfirmation,
}: PinFormState): RegistrationAction => ({
  type: 'COMPLETE_STAGE',
  apiUrl: '/api/account/registration/security-code',
  payload: {
    securityCode,
    securityCodeConfirmation,
  },
})

export const sendSecurityQuestion = ({
  question,
  answer,
}: SecurityQuestionState): RegistrationAction => ({
  type: 'COMPLETE_STAGE',
  apiUrl: '/api/account/registration/security-question',
  payload: {
    question,
    answer,
  },
})

export const sendPersonalDetails = (
  formState: Record<string, unknown>
): RegistrationAction => ({
  type: 'COMPLETE_STAGE',
  apiUrl: '/api/account/registration/personal-details',
  payload: {
    ...formState,
  },
})

export const getConfirmDetails = () => ({
  type: 'GET_CONFIRM_DETAILS',
})

export const getPersonalDetails = () => ({
  type: 'GET_PERSONAL_DETAILS',
})

export const sendPaymentDetails = (
  formState: Record<string, unknown>
): RegistrationAction => ({
  type: 'COMPLETE_STAGE',
  apiUrl: '/api/account/registration/payment-details',
  payload: {
    ...formState,
  },
})

export const sendVerificationMail = (
  formState: Record<string, unknown>
): RegistrationAction => ({
  type: 'COMPLETE_STAGE',
  apiUrl: '/api/account/registration/confirm',
  payload: {
    ...formState,
  },
})

export const getGeoDetails = () => ({
  type: 'GEO_DETAILS',
})

export const sendVerificationCode = () => ({
  type: 'SEND_VERIFICATION_CODE',
})

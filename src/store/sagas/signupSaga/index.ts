import { takeEvery, put, call, select } from '@redux-saga/core/effects'
import axios, { AxiosResponse } from 'axios'
import {
  endStageFetching,
  finishStage,
  setConfirmDetails,
  setInitialPersonalDetails,
  setUserGeo,
  SignUpState,
  stageFetchingErrors,
} from 'src/store/reducers/signup'
import { endSignInStageFetching } from 'src/store/reducers/signin'
import { getSponsorByQuery } from 'src/utils'
import { RegistrationAction, RootState } from '../../index'
import { ISignInRes } from '../../../interfaces/signin/signin'

declare global {
  interface Window {
    grecaptcha: ReCaptchaInstance
    captchaOnLoad: () => void
  }
}

type RegistrationPayload = {
  captcha: string
  body: Record<string, string>
}

const getStages = (state: RootState) => state.signup
const getToken = (state: RootState) => state.signin.data

const config = (token: string) => {
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'content-type': 'application/json',
    },
  }
}

function* completeStage(action: RegistrationAction) {
  const { currentStage }: SignUpState = yield select(getStages)
  const { payload, apiUrl } = action

  try {
    if (currentStage === 0) {
      const { captcha, body } = payload as RegistrationPayload

      body.sponsor = getSponsorByQuery()

      const registrationPayload = {
        captcha,
        body,
      }
      yield put(stageFetchingErrors(false))

      const response: AxiosResponse = yield call(
        axios.post,
        `${process.env.NEXT_PUBLIC_API}${apiUrl}`,
        registrationPayload
      )
      yield put(endSignInStageFetching(response.data))
    } else {
      const { accessToken }: ISignInRes = yield select(getToken)

      yield call(
        axios.post,
        `${process.env.NEXT_PUBLIC_API}${apiUrl}`,
        payload,
        config(accessToken)
      )
      yield put(finishStage())
    }

    yield put(stageFetchingErrors(false))
    yield put(endStageFetching())
  } catch (error) {
    yield put(stageFetchingErrors(error))
    yield put(endStageFetching())
  }
}

export function* handleRegisterSaga(): Generator {
  yield takeEvery('COMPLETE_STAGE', completeStage)
}

function* handelGeoDetails(): Generator {
  try {
    const geoResponse: AxiosResponse = yield call(
      axios.post,
      `${process.env.NEXT_PUBLIC_API}/api/helpers/geo/detect`
    )
    yield put(setUserGeo(geoResponse.data))
  } catch (error) {
    throw error
  }
}

export function* handleGeoSaga(): Generator {
  yield takeEvery('GEO_DETAILS', handelGeoDetails)
}

export function* handlePersonalDetails(): Generator {
  const { accessToken }: ISignInRes = yield select(getToken)

  try {
    const response: AxiosResponse = yield call(
      axios.get,
      `${process.env.NEXT_PUBLIC_API}/api/account/registration/get-personal-details`,
      config(accessToken)
    )
    yield put(setInitialPersonalDetails(response.data))
  } catch (error) {
    throw error
  }
}

export function* handlePersonalDetailsSaga(): Generator {
  yield takeEvery('GET_PERSONAL_DETAILS', handlePersonalDetails)
}

export function* handleConfirmDetails(): Generator {
  const { accessToken }: ISignInRes = yield select(getToken)

  try {
    const response: AxiosResponse = yield call(
      axios.get,
      `${process.env.NEXT_PUBLIC_API}/api/account/registration/get-confirm-information`,
      config(accessToken)
    )
    yield put(setConfirmDetails(response.data))
  } catch (error) {
    throw error
  }
}

export function* handleConfirmDetailsSaga(): Generator {
  yield takeEvery('GET_CONFIRM_DETAILS', handleConfirmDetails)
}

export function* handleConfirmUser(): Generator {
  try {
    const response: AxiosResponse = yield call(
      axios.get,
      `${process.env.NEXT_PUBLIC_API}/api/account/registration/verify`,
      config()
    )
  } catch (error) {
    throw error
  }
  yield put(endStageFetching())
}

export function* handleConfirmUserSaga(): Generator {
  yield takeEvery('GET_CONFIRM_USER', handleConfirmUser)
}

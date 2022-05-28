import { call, takeEvery, put } from '@redux-saga/core/effects'
import axios from 'axios'
import {
  endFetching,
  setFetchingErrors,
  stopFetching,
} from 'src/store/reducers/forgotpassword'
import { ResponseGenerator } from 'src/interfaces/saga/saga'
import { Action } from '../../index'
import { setIsCodeValid } from '../../reducers/newPassword'

const ChangePassword = async (data: any) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API}/api/password-recovery/request`,
    data
  )
}

const VerifyCode = async (data: any) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API}/api/password-recovery/validate`,
    data
  )
}

function* ChangeUserPassword(action: Action) {
  try {
    const res: ResponseGenerator = yield call(ChangePassword, action.payload)

    yield put(endFetching(res.data))
  } catch (error) {
    yield put(setFetchingErrors(error))
    yield put(stopFetching())
  }
}

export function* handleChangePasswordSaga(): Generator {
  yield takeEvery('GET_PASSWORD_FROM_EMAIL', ChangeUserPassword)
}

function* handleCodeVerification(action: Action) {
  try {
    yield call(VerifyCode, action.payload)
    yield put(setIsCodeValid(true))
  } catch (error) {
    yield put(setFetchingErrors(error))
    yield put(setIsCodeValid(false))
  }
}

export function* handleCodeVerificationSaga(): Generator {
  yield takeEvery('VERIFY_CODE', handleCodeVerification)
}

import { call, takeEvery, put } from '@redux-saga/core/effects'
import axios from 'axios'
import {
  endSignInStageFetching,
  setFetchingErrors,
  stopFetching,
} from 'src/store/reducers/signin'
import { ResponseGenerator } from 'src/interfaces/saga/saga'
import { setAccessToken } from 'src/utils'
import { Action } from '../../index'

const LogIn = async (data: Record<string, unknown>) => {
  return axios.post(`${process.env.NEXT_PUBLIC_API}/api/auth/login`, data)
}

function* LoginUser(action: Action) {
  try {
    const res: ResponseGenerator = yield call(LogIn, action.payload)
    if (Object.values(res.data.registrationStatus).every((el) => el)) {
      setAccessToken(res.data.accessToken)
    }
    yield put(endSignInStageFetching(res.data))
  } catch (error) {
    yield put(setFetchingErrors(error))
    yield put(stopFetching())
  }
}

export function* handleLoginSaga(): Generator {
  yield takeEvery('LOGIN_USER', LoginUser)
}

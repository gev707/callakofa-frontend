import { call, takeEvery, put } from '@redux-saga/core/effects'
import axios from 'axios'
import {
  endFetching,
  setFetchingErrors,
  setIsPasswordChanged,
  stopFetching,
} from 'src/store/reducers/newPassword'

import { ResponseGenerator } from 'src/interfaces/saga/saga'
import { Action } from '../../index'

const newPassword = async (data: any) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API}/api/password-recovery/recover`,
    data
  )
}

function* SetNewPassword(action: Action) {
  try {
    yield call(newPassword, action.payload)
    yield put(setIsPasswordChanged())
  } catch (error) {
    yield put(setFetchingErrors(error))
    yield put(stopFetching())
  }
}

export function* handleSetNewPasswordSaga(): Generator {
  yield takeEvery('SET_NEW_PASSWORD', SetNewPassword)
}

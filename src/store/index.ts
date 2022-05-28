import {
  configureStore,
  Store,
  AnyAction,
  combineReducers,
  Reducer,
} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import signin from './reducers/signin'
import signup from './reducers/signup'
import forgotPassword from './reducers/forgotpassword'
import newPassword from './reducers/newPassword'
import ProfileDataStore from './ProfileDataStore/ProfileDataStore'
import MainLayoutDataStore from './MainLayoutDataStore/MainLayoutDataStore'
import GlobalConfigDataStore from './GlobalConfigDataStore/GlobalConfigDataStore'
import MemberManagementDataStore from './MebmerManagementDataStore/MemberManagementDataStore'
import sideMenuDataStore from './SideMenuDataStore'

const sagaMiddleware = createSagaMiddleware()

const reducer = combineReducers({
  signin,
  signup,
  forgotPassword,
  newPassword,
  ProfileDataStore,
  MainLayoutDataStore,
  sideMenuDataStore,
  GlobalConfigDataStore,
  MemberManagementDataStore,
}) as Reducer

export const store: Store<any, AnyAction> = configureStore({
  reducer,
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>

export type RegistrationAction = {
  type: string
  payload: Record<string, unknown>
  apiUrl: string
}

export type Action = {
  payload: Record<string, unknown>
  type: string
}

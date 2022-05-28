import { RequestAPI } from '../api/auth/axios-wraper'

function getUser() {
  return RequestAPI.get('api/account/info/me')
}

export const GlobalManager = {
  getUser,
}

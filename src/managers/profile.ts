import { RequestAPI } from '../api/auth/axios-wraper'

function getAccountInfo() {
  return RequestAPI.get('api/account/info/account-info')
}

function getPersonalInfo() {
  return RequestAPI.get('api/account/info/personal-info')
}

function getSocialInfo() {
  return RequestAPI.get('api/account/info/social-info')
}

function getDefaults() {
  return RequestAPI.get('api/account/info/defaults')
}

function changeSocialInfo(data: any) {
  return RequestAPI.post('api/account/edit/change-social-info', data)
}

function changePassword(data: any) {
  return RequestAPI.post('api/account/edit/change-password', data)
}

function changeDefaults(data: any) {
  return RequestAPI.post('api/account/edit/change-defaults', data)
}

function changeSecurityPin(data: any) {
  return RequestAPI.post('api/account/edit/change-security-pin', data)
}

function uploadAvatar(data: any) {
  return RequestAPI.post('api/account/edit/upload-avatar', data)
}

function removeAvatar() {
  return RequestAPI.get('api/account/edit/remove-avatar')
}

export const ProfileManager = {
  getAccountInfo,
  getPersonalInfo,
  getSocialInfo,
  changeSocialInfo,
  changePassword,
  uploadAvatar,
  removeAvatar,
  changeDefaults,
  getDefaults,
  changeSecurityPin,
}

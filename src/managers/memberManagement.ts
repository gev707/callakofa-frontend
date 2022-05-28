import { RequestAPI } from '../api/auth/axios-wraper'

function getMembersList(data: any) {
  return RequestAPI.post('api/admin/member-management/list', data)
}
function getMemberData(id: { userId: number }) {
  return RequestAPI.post('api/admin/member-management/get-account-info', id)
}

function getMemberPersonalInfo(id: string) {
  return RequestAPI.post('api/admin/member-management/get-profile-info', {
    userId: +id,
  })
}

function updateMemberPersonalInfo(data: any) {
  return RequestAPI.post(
    'api/admin/member-management/update-profile-info',
    data
  )
}

function getMemberSocialData(_id: { userId: number }) {
  return RequestAPI.post('api/admin/member-management/get-social', _id)
}

function getMemberCountryInfo() {
  return RequestAPI.get('api/helpers/geo/countries?limit=1000')
}

function getMemberStatesInfo(id: any) {
  return RequestAPI.get(`api/helpers/geo/states?countryId=${id}&limit=1000`)
}

function updatePassword(data: any) {
  return RequestAPI.post('api/admin/member-management/update-password', data)
}
function updateSecurityPin(data: any) {
  return RequestAPI.post(
    'api/admin/member-management/update-security-pin',
    data
  )
}
function updateMemberSocialData(data: any) {
  return RequestAPI.post('api/admin/member-management/update-social', data)
}
export const MemberManagement = {
  getMembersList,
  getMemberData,
  getMemberPersonalInfo,
  getMemberSocialData,
  getMemberCountryInfo,
  getMemberStatesInfo,
  updatePassword,
  updateSecurityPin,
  updateMemberSocialData,
  updateMemberPersonalInfo,
}

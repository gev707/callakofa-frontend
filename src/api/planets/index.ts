import axios, { AuthHeaders } from '../index'

export const getPlanets = (headers: AuthHeaders = {}) =>
  axios.get(`/api/planets`, headers).then(({ data }) => data)

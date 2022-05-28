import axios, { AxiosError, AxiosResponse } from 'axios'
import { getAccessToken, removeToken } from '../../utils'

export interface ApiResponse {
  success: boolean
  message?: string | null
  data?: unknown
}

export interface ErrorResponse extends AxiosResponse<any> {
  data: {
    success: boolean
    message?: string
    [key: string]: any
  }
}

export interface ProtobufResponse {
  body: {
    type: string
    data: Uint8Array
  }
  id: string
  needDecode: boolean
}

export type PartialRecursively<T> = {
  [P in keyof T]?: PartialRecursively<T[P]>
}

type OmitDistributive<T, K extends PropertyKey> = T extends any
  ? T extends Record<any, any>
    ? OmitItem<OmitRecursively<T, K>>
    : T
  : never
type OmitItem<T> = Record<any, unknown> & { [P in keyof T]: T[P] }
export type OmitRecursively<T extends any, K extends PropertyKey> = Omit<
  { [P in keyof T]: OmitDistributive<T[P], K> },
  K
>

interface RequestAPIMethods {
  get(url: string, headers?: Record<string, any>): Promise<any>

  post(
    url: string,
    body?: Record<string, any>,
    headers?: Record<string, any>
  ): Promise<any>

  put(
    url: string,
    body?: Record<string, any>,
    headers?: Record<string, any>
  ): Promise<any>

  patch(
    url: string,
    body?: Record<string, any>,
    headers?: Record<string, any>
  ): Promise<any>

  delete(url: string, headers?: Record<string, any>): Promise<any>
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
})

const responseBody = (response: AxiosResponse<any>): Promise<ApiResponse> =>
  response.data
const responseError = (response: AxiosError): Promise<ErrorResponse> =>
  Promise.reject(response.response)

const setHeaders = (headers?: Record<string, any>): Record<string, any> => {
  const accessToken = getAccessToken()
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...headers,
    },
  }
}

const requestWrapper = async (request: () => Promise<any>): Promise<any> => {
  try {
    return await request()
  } catch (error: any) {
    if (error.status === 401) {
      removeToken()
      window.location.href = 'signin'
    }
    return Promise.reject(error)
  }
}

export const RequestAPI: RequestAPIMethods = {
  get: (url, headers) =>
    requestWrapper(() =>
      axiosInstance
        .get(url, setHeaders(headers))
        .then(responseBody)
        .catch(responseError)
    ),

  post: (url, body, headers) =>
    requestWrapper(() =>
      axiosInstance
        .post(url, body, setHeaders(headers))
        .then(responseBody)
        .catch(responseError)
    ),

  put: (url, body, headers) =>
    requestWrapper(() =>
      axiosInstance
        .put(url, body, setHeaders(headers))
        .then(responseBody)
        .catch(responseError)
    ),

  patch: (url, body, headers) =>
    requestWrapper(() =>
      axiosInstance
        .patch(url, body, setHeaders(headers))
        .then(responseBody)
        .catch(responseError)
    ),

  delete: (url, headers) =>
    requestWrapper(() =>
      axiosInstance
        .delete(url, setHeaders(headers))
        .then(responseBody)
        .catch(responseError)
    ),
}

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

import axios from 'axios'

export interface AuthHeaders {
  headers?: {
    authorization: string
  }
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
})

// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

axiosInstance.interceptors.request.use(
  (config) => {
    // if (!config.headers.Authorization) {
    //   // const token = JSON.parse(localStorage.getItem("auth")).token;

    //   if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    //   }
    // }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response)
    // Edit response config
    return response
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default axiosInstance

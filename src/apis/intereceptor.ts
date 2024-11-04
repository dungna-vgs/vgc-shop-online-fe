import { AxiosInstance } from 'axios'
export function interceptorResponse(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.response.use(
    (response) => {
      // show message from server return
      return response
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}

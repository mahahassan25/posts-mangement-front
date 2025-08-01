import { ref } from 'vue'
import axios from 'axios'
// import store from '../store'

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 30000,
  headers: {
    'Accept': 'application/json',
  }
})

const errors = {
  403: {
    ar: 'انت غير مصرح لك القيام بهذه الخطوة !',
    en: 'You are not authorized to perform this action!'
  },
  401: {
    ar: 'من فضلك سجل دخول اولا !',
    en: 'You are not authinticated, please login now!'
  }
}

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       if (!error.response.config.url.includes('auth')) {
//         if (error.response.status === 401) {
//           localStorage.removeItem('authToken')
//           localStorage.removeItem('user')
//         //   store.commit('removeUser')
//         //   store.commit('showFeedback', {text: errors['401'][`${store.state.language.value}`], color: 'warning'})
//           if (!window.location.href.includes('auth')) window.location = '/auth/signin'
//         } else if (error.response.status === 403) {
//         //   store.commit('showFeedback', {text: errors['403'][`${store.state.language.value}`], color: 'warning'})
//         }
//       }
//     }
//     return Promise.reject(error)
//   }
// )


export default function useAxios() {
  const loading = ref(false)
  const error = ref(null)
  const response = ref(null)

  const request = async (method, url, data = null, params = {}) => {
    loading.value = true
    error.value = null
    response.value = null

    try {
      const res = await axiosInstance({
        method,
        url,
        data,
        params
      })
      response.value = res.data
      return res.data
    } catch (err) {
      console.log(err)
      error.value = err.response.data.errors ? err.response.data.errors : err.response.data.error
      throw err
    } finally {
      loading.value = false
    }
  }

  const get = (url, params) => request('get', url, null, params)
  const post = (url, data) => request('post', url, data)
  const put = (url, data) => request('put', url, data)
  const patch = (url, data) => request('patch', url, data)
  const del = (url,data) => request('delete', url,data)

  return {
    loading,
    error,
    response,
    get,
    post,
    put,
    patch,
    del
  }
}

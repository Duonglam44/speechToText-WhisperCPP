import axios, { AxiosInstance } from 'axios'
import { get, isNil } from 'lodash'
import Router from 'next/router'
import { CookieService } from './cookies'
import { COOKIE_KEYS } from 'constants/common'

const API_URL = process.env.API_URL

const cookieService = CookieService.getInstance()

const defaultOptions = {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  }
}

const instance: AxiosInstance = axios.create(defaultOptions)

function getApi(path: string, options: any = {}, apiURL?: string) {
  return instance.get(`${apiURL || API_URL}/${path}`, {
    ...options,
    headers: {
      ...options.headers,
    },
  })
}

function postApi(path: string, data: any, options: any = {}) {
  console.log('API_URL', API_URL)
  return instance.post(`${API_URL}/${path}`, data, {
    ...options,
    headers: {
      ...options.headers,
    },
  })
}

function putApi(path: string, data: any, options: any = {}) {
  return instance.put(`${API_URL}/${path}`, data, {
    ...options,
    headers: {
      ...options.headers,
    },
  })
}

function patchApi(path: string, data: any, options: any = {}) {
  return instance.patch(`${API_URL}/${path}`, data, {
    ...options,
    headers: {
      ...options.headers,
    },
  })
}

function deleteApi(path: string, options: any = {}) {
  return instance.delete(`${API_URL}/${path}`, {
    ...options,
    headers: {
      ...options.headers,
    },
  })
}

instance.interceptors.response.use(
  (res: any) => {
    return res
  },
  async (err: any) => {
    if (
      !cookieService.getCookie(COOKIE_KEYS.refreshToken) ||
      err.response?.status !== 401
    ) {
      return Promise.reject(err)
    }

    refreshToken()
      .then((res) => {
        const { token, refresh_token } = res?.data || {}
        if (token) {
          cookieService.setAccessToken(token)
        }
        if (refresh_token) {
          cookieService.setCookie(COOKIE_KEYS.refreshToken, refresh_token)
        }

        return instance(err.config)
      })
      .catch((error) => {
        cookieService.deleteCookie(COOKIE_KEYS.refreshToken)
        cookieService.removeAccessToken()

        return Promise.reject(error)
      })
  }
)

instance.interceptors.request.use(
  (req: any) => {
    if (cookieService.accessToken) {
      req.headers['Authorization'] = `Bearer ${cookieService.accessToken}`
    }

    return req
  },
  (err: any) => {

    return Promise.reject(err)
  }
)

const refreshToken = () => {
  const refreshToken = cookieService.getCookie(COOKIE_KEYS.refreshToken)

  return axios.post('/refresh_tokens', {
    token: refreshToken,
  })
}

const Api = {
  get: getApi,
  post: postApi,
  put: putApi,
  delete: deleteApi,
  patch: patchApi,
}

export default Api

export interface ICookieService {
  key: string
  value: string

  getCookie(key: string): string
  setCookie(key: string, value: string): void
  deleteCookie(key: string): void
  getAccessToken(): string
  setAccessToken(accessToken: string): void
}

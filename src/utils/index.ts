export const getSponsorByQuery = (): string => ''

export const haveErrors = (ErrorObject: Record<string, string>): boolean => {
  return !Object.values(ErrorObject).every((elem) => elem === '')
}

export const getAccessToken = (): string | null => {
  const nameEQ = 'accessToken='
  const ca = document.cookie.split(';')
  for (let c of ca) {
    while (c.charAt(0) == ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

export const removeToken = (): void => {
  document.cookie =
    'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

export const setAccessToken = (token: string): void => {
  let expires = ''
  const date = new Date()
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000)
  expires = `; expires=${date.toUTCString()}`
  document.cookie = `accessToken=${token || ''}${expires}; path=/`
}

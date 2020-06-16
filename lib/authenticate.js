// Helpers
import fetchAPI from './fetch-api'
import { API_USER } from './constants'

const isServer = typeof window === 'undefined'
readToken() // cache token immediately

export default (async function authenticate() {
  const token = readToken()
  if (!token) return {}

  if (!isServer) {
    // Sometimes, user in the client side global cache can be undefined.
    // So, we need to get the user again and assign the user to the global cache.
    // If the token has updated, let's refetch.
    if (!window.__user || window.__token_updated) {
      window.__token_updated = false
      const { user } = await getUser(token)

      // Singleton: this is the only place to update `window.__user`
      // eslint-disable-next-line require-atomic-updates
      window.__user = user
    }

    return { user: window.__user, token }
  }

  const user = await getUser(token)
  return { ...user, token }
})

export function readToken() {
  if (!isServer) {
    const Cookies = require('js-cookie')
    const { token } = Cookies.get()
    window.__token = token
    return token
  }
}

export async function getUser(token) {
  if (!token) return {}

  let res

  try {
    res = await fetchAPI(API_USER, token, {
      throwOnHTTPError: true
    })
  } catch (err) {
    if (err.status && 403 === err.status) {
      return {}
    }
    throw err
  }

  return res
}

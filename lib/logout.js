// Packages
import NProgress from 'nprogress'
import Cookies from 'js-cookie'

// Helpers
import { readToken } from './authenticate'
import fetchAPI from './fetch-api'
import { API_USER_TOKENS } from './constants'
import * as metrics from './metrics'
import setCookie from './set-cookie'

const removeScope = () => {
  Cookies.remove('scope')
}

export default async () => {
  const token = readToken()
  NProgress.start()
  try {
    const result = await fetchAPI(`${API_USER_TOKENS}/current`, token, {
      method: 'DELETE',
      throwOnHTTPError: true
    })

    if (!result.tokenId) {
      throw new Error('Unable to log out')
    }

    // Make sure to unlink the user from FullStory
    if (typeof window !== 'undefined' && window.FS) {
      window.FS.identify(false)
    }

    Cookies.remove('token')
    Cookies.remove('authorization')
    Cookies.remove('team')
    removeScope()
    setCookie('logged-out', 1)
    window.__user = null
    window.__token = null
    // Stop recording after logout
    if (typeof window !== 'undefined' && window.FS) {
      window.FS.shutdown()
    }

    metrics.event({
      action: 'logout',
      category: 'engagement'
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.stack)

    // Make sure to unlink the user from FullStory
    if (typeof window !== 'undefined' && window.FS) {
      window.FS.identify(false)
    }

    // we consider it already logged out
    // if the user doesn't have access to
    // own tokens or token lookup 404s
    Cookies.remove('token')
    Cookies.remove('authorization')
    Cookies.remove('team')
    removeScope()
    setCookie('logged-out', 1)
    window.__user = null
    window.__token = null

    metrics.event({
      action: 'logout API failed',
      category: 'engagement'
    })
  } finally {
    NProgress.done()
  }
}

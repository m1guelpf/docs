// Packages
import fetch from 'isomorphic-unfetch'
import { parse as parseContentType } from 'content-type'

import { API_USER, API_TEAMS, PRODUCT_DOMAIN } from '~/lib/constants'
import { logFetchStart, logFetchEnd } from '~/lib/logger'

const preloadEndpoints = [API_USER, API_TEAMS]

const API_URL = process.env.NEXT_PUBLIC_API_URL || `https://${PRODUCT_DOMAIN}`
const NETWORK_ERR_CODE = 'network_error'
const NETWORK_ERR_MESSAGE =
  'A network error has occurred. Please check your connection and try again.'

const isServer = typeof window === 'undefined'
const agents = new Map()

export default async function fetchAPI(path, token = null, opts = {}) {
  const headers = opts.headers || {}

  if (token) {
    if (
      preloadEndpoints.some(endpoint => path.startsWith(endpoint)) &&
      !isServer &&
      location.href.startsWith(`https://${PRODUCT_DOMAIN}`)
    ) {
      // Don't add `Authorization` header in production, for matching the header of
      // `<link rel="preload"/>` so the browser can re-use the cache
      // for prefetch APIs (user and teams)
    } else {
      headers.Authorization = `bearer ${token}`
    }
  }

  // accept path to be a full url or a relative path
  const url = path[0] === '/' ? API_URL + path : path
  let agent

  if (isServer) {
    const { parse } = require('url')
    const { protocol } = parse(url)
    if (protocol) {
      agent = getAgent(protocol)
    }
  }

  let res, data, err

  const logId = logFetchStart(url, opts.method || 'GET')
  try {
    res = await fetch(url, { ...opts, headers, agent })

    if (opts.throwOnHTTPError && (res.status < 200 || res.status >= 300)) {
      const { type } = parseContentType(
        res.headers.get('Content-Type') || 'text/plain'
      )
      if (type === 'application/json') {
        data = await res.json()

        // some APIs don't wrap their errors in `error`
        // (like api-www-user
        if (opts.wrapErrorsLegacy && data.code && data.message) {
          data.error = data
        }

        err = new Error(
          data.error == null
            ? `Unexpected Error (${opts.method} ${url})`
            : data.error.message || data.error.code
        )
        err.res = res
        err.status = res.status
        if (data.error) {
          err.code = data.error.code
          for (const field of Object.keys(data.error)) {
            if (field !== 'message') {
              err[field] = data.error[field]
            }
          }
        } else {
          err.code = res.status
        }
      } else {
        // handle it below as network error
        let text = ''
        try {
          text = await res.text()
        } catch (berr) {
          // eslint-disable-next-line no-console
          console.error('error buffering text', berr)
        }
        const cerr = Error(
          `Unexpected response content-type (${opts.method ||
            'GET'} ${url}): ` +
            type +
            `(${res.status}) ${text}`
        )
        cerr.res = res
        cerr.status = res.status
        throw cerr
      }
    } else if (res.status === 204) {
      // Since 204 means no content we return null
      data = null
    } else if ((res.headers.get('Content-Type') || '').startsWith('text/')) {
      data = await res.text()
    } else {
      data = await res.json()
    }
    // Nothing throws, log the result (`err` can be undefined)
    logFetchEnd(logId, err, res.status, res.headers.get('x-now-id'))
  } catch (e) {
    // Log the original error
    logFetchEnd(
      logId,
      e,
      res ? res.status : null,
      res ? res.headers.get('x-now-id') : null
    )
    err = isServer ? e : new Error(NETWORK_ERR_MESSAGE)
    err.code = NETWORK_ERR_CODE
  }

  if (!err) return data
  if (err.status < 500) throw err
  err.stack = (err.stack ? err.stack : '') + ' ### Fetched URL: ' + url
  if (opts.body) {
    err.stack = (err.stack ? err.stack : '') + ' ### Request Body: ' + opts.body
  }
  throw err
}

const getAgent = protocol => {
  if (!agents.has(protocol)) {
    const http = require('http')
    const https = require('https')
    const module = protocol === 'https:' ? https : http
    const opts = {
      keepAlive: true,
      keepAliveMsecs: 10000,
      maxSockets: 100
    }
    const agent = new module.Agent(opts)
    agents.set(protocol, agent)
  }

  return agents.get(protocol)
}

const isServer = typeof window === 'undefined'

let logIndex = 0
let logRequestInfo = new Map()

export function logFetchStart(url, method) {
  logIndex++

  if (isServer) return logIndex
  logRequestInfo[logIndex] = {
    time: Date.now(),
    url,
    method
  }
  // eslint-disable-next-line no-console
  console.log(`#${logIndex} .. ${method} ${url} | ${Date.now()}`)

  return logIndex
}

export function logFetchEnd(index, error, status, requestId) {
  if (isServer) return

  const info = logRequestInfo[index]
  if (!info) return

  const now = Date.now()
  if (error) {
    // eslint-disable-next-line no-console
    console.error(
      `#${index} -> ${[info.method, info.url, requestId]
        .filter(Boolean)
        .join(' ')} (${status ? status + ', ' : ''}ERROR: ${error.message ||
        error.toString()}) [${now - info.time}ms] | ${Date.now()}`
    )
  } else {
    // eslint-disable-next-line no-console
    console.log(
      `#${index} -> ${[info.method, info.url, requestId]
        .filter(Boolean)
        .join(' ')} (${status}) [${now - info.time}ms] | ${Date.now()}`
    )
  }

  logRequestInfo.delete(index)
}

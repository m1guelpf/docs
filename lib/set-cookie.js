import Cookies from 'js-cookie'
import ms from 'ms'

// when you're setting a cookie, expiration is always required
// because iOS Safari ignores cookies that don't have a expire date
export default function setCookie(
  name,
  value,
  expires = '365d',
  res,
  path = '/'
) {
  const date = new Date(Date.now() + ms(expires))
  const secure = process.env.NODE_ENV === 'production' // dev doesn't support https

  if (res) {
    // In the server side
    const cookie = require('cookie')
    return res.setHeader(
      'Set-Cookie',
      cookie.serialize(name, value, {
        sameSite: 'lax',
        secure,
        path,
        expires: date
      })
    )
  }

  // In the client side
  return Cookies.set(name, value, {
    expires: date,
    path,
    secure,
    SameSite: 'Lax'
  })
}

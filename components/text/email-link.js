import React from 'react'
import Link from '~/components/text/link'

const typeToEmail = {
  support: 'support@vercel.com',
  sales: 'sales@vercel.com'
}

const EmailLink = ({ children, type, subject }) => (
  <Link
    href={`mailto:${typeToEmail[type]}${
      subject ? `?subject=${encodeURIComponent(subject)}` : ''
    }`}
  >
    {children || typeToEmail[type]}
  </Link>
)

export default EmailLink

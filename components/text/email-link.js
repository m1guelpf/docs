import React from 'react'
import Link from '~/components/text/link'

const typeToEmail = {
  support: 'support@zeit.co',
  sales: 'sales@zeit.co'
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

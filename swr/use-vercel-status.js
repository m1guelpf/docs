import useSWR from 'swr'
import fetch from 'isomorphic-unfetch'

export default function useVercelStatus(opts) {
  return useSWR(
    '/status-api',
    async endpoint => {
      const res = await fetch(endpoint).then(r => r.json())
      return res
    },
    opts
  )
}

import cn from 'classnames'

import Link from '@geist/link'
import Text from '@geist/text'
import useVercelStatus from '@swr/use-vercel-status'
import styles from './status-indicator.module.css'

const getStatus = (incident, error) => {
  if (error) {
    // There was an error fetching data, show gray instead of alarming red
    return 'secondary'
  }

  if (!incident) {
    return 'success'
  }

  if (incident.impact === 'critical' || incident.impact === 'major') {
    return 'error'
  }

  return 'warning'
}

const StatusIndicator = () => {
  let { data: incidents, error } = useVercelStatus()
  if (incidents?.error) error = incidents.error
  const incident = Array.isArray(incidents)
    ? incidents[incidents.length - 1]
    : null
  const status = !incidents ? 'secondary' : getStatus(incident, error)

  return (
    <Link href="https://vercel-status.com" external>
      <div className={styles.content}>
        <Text
          small
          style={{
            color: 'var(--geist-foreground)',
            fontSize: '14px'
          }}
        >
          Status:
        </Text>

        <span className={cn(styles.indicator, styles[status])} />

        <Text
          small
          type={status}
          weight={500}
          // @ts-ignore Text type doesn't support native HTML attrs
          title={incident?.name}
          className="geist-ellipsis"
        >
          {error
            ? 'No status available.'
            : incidents === undefined
            ? 'Loading status...'
            : incident
            ? incident.name
            : 'All systems normal.'}
        </Text>
      </div>
    </Link>
  )
}

export default StatusIndicator

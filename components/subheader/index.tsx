import cn from 'classnames'
import styles from './subheader.module.css'

interface Props {
  title: string
}

const StickyHeader: React.FC<Props> = ({title, children}) => {
  return (
    <div className={cn("subheader", styles.header)}>
      <p className={styles.title}>{title}</p>

      <div className={styles.actions}>
        {children}
      </div>
    </div>
  )
}

export default StickyHeader

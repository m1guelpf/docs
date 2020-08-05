import cn from 'classnames'
import styles from './tabs.module.css'

interface TabsProps<T> {
  tabs: { title: string; icon?: React.Component; value: T }[]
  selected?: T | null
  setSelected?: (value: T) => void
  disabled?: boolean
}

export default function Tabs<T extends string | number>(props: TabsProps<T>) {
  return (
    <div
      className={cn('geist-no-scrollbar', styles.tabs, {
        [styles.disabled]: props.disabled
      })}
      data-geist-tabs=""
    >
      {props.tabs.map(tab => (
        <div
          key={tab.value}
          className={styles.tabContainer}
          role="button"
          tabIndex={0}
          onClick={() => {
            if (!props.disabled) {
              props.setSelected?.(tab.value)
            }
          }}
          onKeyDown={event => {
            if (!props.disabled && event.key === ' ') {
              event.preventDefault()
              props.setSelected?.(tab.value)
            }
          }}
          data-geist-tab=""
        >
          <div
            className={cn(styles.tab, {
              [styles.activeTab]: props.selected === tab.value
            })}
          >
            {tab.icon && <div className={styles.tabIcon}>{tab.icon}</div>}
            <div>{tab.title}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
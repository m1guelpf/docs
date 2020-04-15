import cn from 'classnames'
import { useState } from 'react'
import { List } from '~/components/list'
import ShowMore from '~/components/show-more'

export default function Quickstarts({ children }) {
  const [expanded, setExpanded] = useState(false)
  const [finishedExpand, setFinishedExpand] = useState(false)
  const topFour = children.slice(0, 4)
  const more = children.slice(4, children.length)

  const toggleExpand = () => {
    const isExpanded = !expanded
    setExpanded(isExpanded)

    if (isExpanded) {
      setTimeout(() => setFinishedExpand(true), 500)
    } else {
      setFinishedExpand(false)
    }
  }

  return (
    <>
      <br />
      <List columnsDesktop={2} columnsTablet={2} columnsMobile={1}>
        {topFour}
      </List>
      <div className={cn('more', { expanded, finished: finishedExpand })}>
        <List columnsDesktop={2} columnsTablet={2} columnsMobile={1}>
          {more}
        </List>
      </div>

      <ShowMore expanded={expanded} onClick={toggleExpand} />

      <style jsx>{`
        .more {
          max-height: 0;
          overflow: hidden;
          height: auto;
          transition: all 0.5s ease;
        }

        .more.expanded {
          max-height: ${Math.ceil(more.length / 2) * 251}px;
        }

        .more.expanded.finished {
          overflow: visible;
        }

        @media screen and (max-width: 600px) {
          .more.expanded {
            max-height: ${more.length * 251}px;
          }
        }
      `}</style>
    </>
  )
}

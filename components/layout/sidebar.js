import cn from 'classnames'
import { HEADER_HEIGHT } from '~/lib/constants'

export default function Sidebar({ active, children, innerRef, fixed }) {
  return (
    <aside className={cn('sidebar', { active, fixed })} ref={innerRef}>
      {children}
      <style jsx>{`
        .sidebar {
          background: #fff;
          padding-bottom: 40px;
          padding-right: 24px;
          width: 280px;
          -webkit-overflow-scrolling: touch;
          flex-shrink: 0;
        }

        .sidebar.fixed {
          bottom: 0;
          padding-top: 40px;
          position: fixed;
          top: ${HEADER_HEIGHT}px;
          z-index: 1;
          overflow-y: scroll;
        }

        @media screen and (max-width: 950px) {
          .sidebar {
            border-right: 0;
            display: none;
            left: 0;
            padding: 40px 24px;
            right: 0;
            width: 100%;
          }

          .sidebar.active {
            display: block;
          }
        }
      `}</style>
    </aside>
  )
}

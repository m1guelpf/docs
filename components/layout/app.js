import React, { useState, useEffect } from 'react'
import { useAmp } from 'next/amp'
import Page from '~/components/layout/page'
import Header from '~/components/layout/header'
import { UserContext } from '~/lib/user-context'
import UseTeamInfo from '~/lib/use-team-info'
import { withToasts } from '~/components/toasts'
import * as bodyLocker from '~/lib/utils/body-locker'

const LayoutHeader = React.memo(props => {
  const isAmp = useAmp()
  return <Header {...props} isAmp={isAmp} />
})

function Layout({ data, children }) {
  const [navigationActive, setNavigationActive] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(
    (typeof window !== 'undefined' && window.pageYOffset) || 0
  )

  useEffect(() => {
    window.addEventListener('scroll', onScroll.bind(this))
    return () => {
      window.removeEventListener('scroll', onScroll.bind(this))
    }
  }, [])

  const onScroll = () => {
    requestAnimationFrame(() => {
      setScrollPosition(window.pageYOffset)
    })
  }

  const handleToggleNavigation = () => {
    if (navigationActive === true) {
      bodyLocker.unlock()
    } else {
      bodyLocker.lock()
    }

    setNavigationActive(!navigationActive)
  }

  const handleIndexClick = () => {
    if (navigationActive) {
      handleToggleNavigation()
    }
  }

  const detached = scrollPosition > 0

  return (
    <Page>
      <UserContext.Consumer>
        {({ user, userLoaded }) => (
          <>
            <UseTeamInfo
              user={user}
              render={({ teams }) => (
                <LayoutHeader
                  detached={detached}
                  onToggleNavigation={handleToggleNavigation}
                  user={user}
                  teams={teams}
                  userLoaded={userLoaded}
                  navigationActive={navigationActive}
                  handleIndexClick={handleIndexClick}
                  data={data}
                />
              )}
            />
          </>
        )}
      </UserContext.Consumer>
      {children}
    </Page>
  )
}

export default withToasts(Layout)

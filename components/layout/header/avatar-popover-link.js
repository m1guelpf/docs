import { memo, useCallback, useState } from 'react'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import cn from 'classnames'
import PropTypes from 'prop-types'

// Components
import Popover from '~/components/popover'
import Avatar from '~/components/avatar'
import * as PopOver from '~/components/popover/popover-menu'
import PlusIcon from '~/components/icons/plus'
// import MoonSunIcon from '../moon-sun'
// import Badge from '../../geist/badge'
// import LocalStorage from '../local-storage'

// Helpers
// import { DarkBgContext } from '../../lib/with-dark-mode'
// import { toggleDarkMode } from '../../lib/dark-mode'

const AvatarPopOverLink = ({ user, disableDarkMode, onLogout }) => {
  const [loggingOut, setLoggingOut] = useState(false)

  const { pathname } = useRouter()

  const onPopOverOpen = useCallback(() => {
    Router.prefetch('/account')
    Router.prefetch('/dashboard')

    // in case user logs out, we prefetch
    // the page they get redirected to
    Router.prefetch('/login')
  }, [])

  if (!user) return null

  return (
    <>
      {/* <DarkBgContext.Consumer>
        {darkBg => ( */}
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        trigger={
          <Avatar
            uid={user.uid}
            title={user.username || user.email}
            size={30}
            hash={user.avatar}
          />
        }
        onOpen={onPopOverOpen}
      >
        <PopOver.Menu tipOffset={173} width={200}>
          <PopOver.Item hover active={pathname === '/dashboard'}>
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>
          </PopOver.Item>

          <PopOver.Divider />

          <PopOver.Item
            hover
            active={pathname === '/teams/create'}
            icon={<PlusIcon size={18} />}
          >
            <Link href="/teams/create">
              <a>New Team</a>
            </Link>
          </PopOver.Item>

          <PopOver.Item hover active={pathname === '/account'}>
            <Link href="/account">
              <a>Settings</a>
            </Link>
          </PopOver.Item>

          {/* 

              TODO: To uncomment, we need to enable darkmode in the docs.
              
              <PopOver.Divider />

              {
                <>
                  <LocalStorage name="zeit-dark-mode" defaultValue={darkBg}>
                    {(value, setValue) => (
                      <PopOver.Item
                        hover
                        icon={<MoonSunIcon dark={value} />}
                        disabled={disableDarkMode}
                      >
                        <a
                          className={cn('dark-mode', {
                            disabled: disableDarkMode
                          })}
                          onClick={() => {
                            if (!disableDarkMode) {
                              toggleDarkMode(value, setValue)
                            }
                          }}
                        >
                          {value && !disableDarkMode ? (
                            'Light Mode'
                          ) : (
                            <>
                              <span className="dark-switch">Dark Mode</span>
                              <Badge uppercase type="lite">
                                Beta
                              </Badge>
                            </>
                          )}
                        </a>
                      </PopOver.Item>
                    )}
                  </LocalStorage>
                </>
              } */}

          <PopOver.Divider />

          <PopOver.Item hover>
            <a
              className={cn('logout', {
                disabled: loggingOut
              })}
              onClick={() => {
                setLoggingOut(true)
                onLogout()
              }}
            >
              {loggingOut ? 'Logging out...' : 'Logout'}
            </a>
          </PopOver.Item>
        </PopOver.Menu>
      </Popover>
      {/* )}
      </DarkBgContext.Consumer> */}

      <style jsx>{`
        .dark-mode,
        .logout {
          cursor: pointer;
        }

        .dark-mode.disabled {
          cursor: not-allowed;
        }

        .dark-switch {
          margin-right: var(--geist-gap-quarter);
        }
      `}</style>
    </>
  )
}

AvatarPopOverLink.displayName = 'AvatarPopOverLink'

AvatarPopOverLink.propTypes = {
  user: PropTypes.object,
  disableDarkMode: PropTypes.bool,
  onLogout: PropTypes.func
}

export default memo(AvatarPopOverLink)

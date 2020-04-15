import { Component, Fragment } from 'react'
import { parse } from 'querystring'
import cn from 'classnames'
import { useAmp } from 'next/amp'
import Router, { withRouter, useRouter } from 'next/router'
import getAlgoliaClient from '~/lib/get-algolia'
import logout from '~/lib/logout'
import getDashboardHref from '~/lib/utils/get-dashboard-href'
import { InstantSearch, Configure } from 'react-instantsearch-dom'
import AvatarPopOverLink from './avatar-popover-link'
import { Navigation, NavigationItem } from '~/components/navigation'
import AutoComplete from '~/components/search'
import Avatar from '~/components/avatar'
import LayoutHeader from './header-wrapper'
import Logo from '~/components/icons/logo'
import MenuToggle from './menu-toggle'
import { HeaderFeedback } from '~/components/feedback-input'
import {
  API_DOCS_FEEDBACK,
  ORG_NAME,
  PRODUCT_SHORT_NAME
} from '~/lib/constants'
import MenuPopOver from '~/components/layout/header/menu-popover'
import DocsNavbarDesktop from '~/components/layout/navbar/desktop'

function AmpUserFeedback() {
  const isAmp = useAmp()
  if (!isAmp) return null
  const router = useRouter()
  return (
    <>
      <a href={router.pathname} className="feedback-link">
        <HeaderFeedback loggedOut />
      </a>
      <NavigationItem customLink>
        <a href="/blog">Blog</a>
      </NavigationItem>
      <NavigationItem customLink>
        <a href="/support">Support</a>
      </NavigationItem>
      <NavigationItem customLink>
        <a href="/login">Login</a>
      </NavigationItem>
    </>
  )
}

const searchClient = getAlgoliaClient()

class Header extends Component {
  state = {
    menuActive: false,
    query: '',
    searchState: {
      query: this.getSearchQ()
    }
  }

  componentDidMount() {
    const {
      searchState: { query }
    } = this.state
    if (query && document.referrer.includes('amp')) {
      // focus algolia to show results
      const sel = selector => document.querySelector(selector)
      sel('.search-wrapper input').focus()
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.hideHeader &&
      this.props.hideHeader !== prevProps.hideHeader
    ) {
      const sel = selector => document.querySelector(selector)
      sel('.search-wrapper input').blur()
    }
  }

  onLogoRightClick = event => {
    event.preventDefault()
    Router.push('/design')
  }

  getSearchQ() {
    const { router } = this.props
    let query = router.query.query
    if (typeof window === 'undefined') return query
    if (!query) query = parse(location.search.substr(1)).query
    return query
  }

  onSuggestionSelected = (_, { suggestion }) => {
    this.setState({
      query: suggestion.title
    })
  }

  onSuggestionCleared = () => {
    this.setState({
      query: ''
    })
  }

  handleAvatarClick = () => {
    this.setState(state => ({
      menuActive: !state.menuActive
    }))
  }

  handleLogout = async () => {
    await logout()
    // Stop recording after logout
    if (typeof window !== 'undefined' && window.FS) {
      window.FS.shutdown()
    }
    Router.push('/login')
  }

  handleClickOutsideMenu = () => {
    this.setState(() => ({
      menuActive: false
    }))
  }

  handleFeedbackSubmit = async (feedback, done) => {
    const res = await fetch(API_DOCS_FEEDBACK, {
      method: 'POST',
      body: JSON.stringify(feedback)
    })
    if (res.status !== 200) {
      done('Sorry, something went wrong, please try again.')
    } else done()
  }

  renderMenuTrigger = ({ handleProviderRef, menu }) => {
    const { user } = this.props
    return (
      <span
        onClick={this.handleAvatarClick}
        ref={handleProviderRef}
        style={{ position: 'relative' }}
      >
        <Avatar user={user} uid={user.uid} hash={user.avatar} size={30} />
        {menu}
        <style jsx>{`
          span {
            cursor: pointer;
            margin-left: 10px;
          }
        `}</style>
      </span>
    )
  }

  renderSearch() {
    return (
      <div className="search-bar">
        <InstantSearch
          indexName="prod_docs"
          searchClient={searchClient}
          searchState={this.state.searchState}
          onSearchStateChange={searchState => {
            this.setState({
              searchState: {
                ...this.state.searchState,
                ...searchState
              }
            })
          }}
        >
          <Configure hitsPerPage={8} />
          <AutoComplete
            onSuggestionSelected={this.onSuggestionSelected}
            onSuggestionCleared={this.onSuggestionCleared}
          />
        </InstantSearch>

        <style jsx>{`
          .search-bar :global(.react-autosuggest__input),
          .search-bar input {
            height: 32px;
            max-width: 60vw;
            width: 278px;
            padding: 0 12px;
            border-radius: 5px;
          }

          .search-bar
            :global(.search__container.focused .react-autosuggest__input),
          .search-bar :global(.react-autosuggest__input:focus),
          .search-bar input:focus {
            border-color: var(--accents-5);
            box-shadow: none;
            background: var(--geist-background);
          }

          .search-bar
            :global(.search__container.has-value.focused
              .react-autosuggest__input),
          .search-bar
            :global(.search__container.has-value
              .react-autosuggest__input:focus),
          .search-bar
            :global(.search__container.has-value.focused .no-results) {
            border-radius: 4px;
          }

          .search-bar :global(.react-autosuggest__suggestions-container--open),
          .search-bar :global(.no-results) {
            top: 40px;
            width: 480px;
            max-width: calc(100vw - 32px);
            left: 50%;
            transform: translateX(-50%);
          }
        `}</style>
      </div>
    )
  }

  render() {
    const {
      currentTeamSlug,
      navigationActive,
      onToggleNavigation,
      handleIndexClick,
      router,
      user,
      userLoaded,
      isAmp,
      hideHeader,
      detached,
      hideHeaderSearch,
      dynamicSearch,
      isTop,
      inHero,
      data
    } = this.props
    const dashboard = getDashboardHref(user, currentTeamSlug)
    const buildAmpNavClass = classes => {
      return isAmp
        ? `'${classes}' + ( header.active ? ' active' : '')`
        : undefined
    }

    return (
      <div className="header-wrapper">
        <LayoutHeader
          hideHeader={hideHeader}
          detached={detached}
          hideHeaderSearch={hideHeaderSearch}
          dynamicSearch={dynamicSearch}
          isTop={isTop}
          inHero={inHero}
          className="header"
          isAmp={isAmp}
        >
          <div className="left-nav">
            <a
              className="logo"
              href={dashboard}
              aria-label={`${ORG_NAME} Home`}
              onContextMenu={this.onLogoRightClick}
            >
              <Logo height="25px" width="28px" />
            </a>

            {!isAmp && (
              <Navigation
                data-amp-bind-class={buildAmpNavClass('main-navigation')}
                className={cn('main-navigation', { active: false })}
              >
                <div className="navigation-items">
                  <NavigationItem
                    href="/docs"
                    active={
                      router.pathname.startsWith('/docs') &&
                      !router.pathname.startsWith('/docs/api') &&
                      !router.pathname.startsWith('/docs/integrations') &&
                      !router.pathname.startsWith('/docs/now-cli') &&
                      !router.pathname.startsWith('/docs/runtimes') &&
                      !router.pathname.startsWith('/docs/configuration')
                    }
                    onClick={handleIndexClick}
                  >
                    Docs
                  </NavigationItem>
                  <NavigationItem
                    href="/guides"
                    active={router.pathname.startsWith('/guides')}
                    onClick={handleIndexClick}
                  >
                    Guides
                  </NavigationItem>

                  <div
                    className={cn('developer-dropdown desktop-only', {
                      active:
                        router.pathname.startsWith('/docs/api') ||
                        router.pathname.startsWith('/docs/integrations') ||
                        router.pathname.startsWith('/docs/now-cli') ||
                        router.pathname.startsWith('/docs/runtimes') ||
                        router.pathname.startsWith('/docs/configuration')
                    })}
                  >
                    <MenuPopOver
                      title="Reference"
                      offsetLeft={-62}
                      primaryList={[
                        {
                          title: `${PRODUCT_SHORT_NAME} CLI`,
                          url: '/docs/now-cli'
                        },
                        {
                          title: 'Configuration',
                          url: '/docs/configuration'
                        },
                        {
                          title: 'Runtimes',
                          url: '/docs/runtimes'
                        },
                        {
                          title: 'Platform API',
                          url: '/docs/api'
                        },
                        {
                          title: 'Integrations API',
                          url: '/docs/integrations'
                        }
                      ]}
                    />
                  </div>
                </div>
              </Navigation>
            )}
          </div>

          {!isAmp && (
            <>
              <div className="search">
                <span
                  className={`search-wrapper ${
                    hideHeaderSearch ? 'hidden' : ''
                  }`}
                >
                  {' '}
                  {this.renderSearch()}
                </span>
              </div>

              <div className="right-nav">
                {userLoaded && (
                  <Navigation className="user-navigation">
                    <AmpUserFeedback />
                    <Fragment>
                      {!user ? (
                        <Fragment>
                          <HeaderFeedback
                            onFeedback={this.handleFeedbackSubmit}
                            loggedOut
                          />
                          <NavigationItem href="/blog">Blog</NavigationItem>
                          <NavigationItem className="chat" href="/support">
                            Support
                          </NavigationItem>
                          <NavigationItem href="/login">Login</NavigationItem>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <HeaderFeedback
                            onFeedback={this.handleFeedbackSubmit}
                          />
                          <NavigationItem href="/blog">Blog</NavigationItem>
                          <NavigationItem className="chat" href="/support">
                            Support
                          </NavigationItem>
                          <span className="avatar-wrapper">
                            <AvatarPopOverLink
                              top={43}
                              avatarSize={32}
                              user={user}
                              team={currentTeamSlug || null}
                              pathname={router.pathname}
                              onLogout={this.handleLogout}
                            />
                          </span>
                        </Fragment>
                      )}
                    </Fragment>
                  </Navigation>
                )}
                <div className="menu-arrow" onClick={onToggleNavigation}>
                  <MenuToggle expanded={navigationActive} />
                </div>
              </div>
            </>
          )}
        </LayoutHeader>

        {navigationActive && (
          <nav className="mobile-only mobile-navigation">
            <div className="section">
              <div className="group has-nav">
                <NavigationItem
                  href="/docs"
                  active={
                    router.pathname.startsWith('/docs') &&
                    !router.pathname.startsWith('/docs/api') &&
                    !router.pathname.startsWith('/docs/integrations') &&
                    !router.pathname.startsWith('/docs/now-cli') &&
                    !router.pathname.startsWith('/docs/runtimes') &&
                    !router.pathname.startsWith('/docs/configuration')
                  }
                  onClick={handleIndexClick}
                >
                  Docs
                </NavigationItem>
                {router.pathname.startsWith('/docs') &&
                  !router.pathname.startsWith('/docs/api') &&
                  !router.pathname.startsWith('/docs/integrations') &&
                  !router.pathname.startsWith('/docs/now-cli') &&
                  !router.pathname.startsWith('/docs/runtimes') &&
                  !router.pathname.startsWith('/docs/configuration') && (
                    <div className="navigation">
                      <DocsNavbarDesktop
                        data={data}
                        url={router}
                        handleIndexClick={handleIndexClick}
                      />
                    </div>
                  )}
              </div>
              <NavigationItem
                href="/guides"
                active={router.pathname.startsWith('/guides')}
                onClick={handleIndexClick}
              >
                Guides
              </NavigationItem>
            </div>

            <div className="section">
              <span className="section__heading">Reference</span>
              <div className="group">
                <NavigationItem
                  href="/docs/api"
                  active={router.pathname.startsWith('/docs/api')}
                  onClick={handleIndexClick}
                >
                  Platform API
                </NavigationItem>
              </div>
              <div className="group">
                <NavigationItem
                  href="/docs/integrations"
                  active={router.pathname.startsWith('/docs/integrations')}
                  onClick={handleIndexClick}
                >
                  Integrations API
                </NavigationItem>
              </div>
              <div className="group">
                <NavigationItem
                  href="/docs/now-cli"
                  active={router.pathname.startsWith('/docs/now-cli')}
                  onClick={handleIndexClick}
                >
                  {PRODUCT_SHORT_NAME} CLI
                </NavigationItem>
              </div>
              <div className="group">
                <NavigationItem
                  href="/docs/runtimes"
                  active={router.pathname.startsWith('/docs/runtimes')}
                  onClick={handleIndexClick}
                >
                  Runtimes
                </NavigationItem>
              </div>
              <div className="group">
                <NavigationItem
                  href="/docs/configuration"
                  active={router.pathname.startsWith('/docs/configuration')}
                  onClick={handleIndexClick}
                >
                  Configuration
                </NavigationItem>
              </div>
            </div>

            <div className="section">
              <span className="section__heading">More</span>
              <NavigationItem href="/blog">Blog</NavigationItem>
              <NavigationItem href="/support">Support</NavigationItem>
              <NavigationItem href="/feedback">Feedback</NavigationItem>
            </div>
          </nav>
        )}
        <style jsx>{`
          .mobile-navigation {
            display: flex;
            height: 0;
            width: 100%;
            transition: all 0.1s ease;
            position: fixed;
            overflow-y: auto;
            top: 80px;
            z-index: 1000;
            max-height: calc(100vh - 80px);
            background: var(--geist-background);
          }

          .mobile-navigation .section {
            margin-bottom: 48px;
          }

          .mobile-navigation .section__heading {
            margin: 0 24px;
            border-bottom: 1px solid #EAEAEA;
            font-size: 12px;
            color: #666;
            padding-bottom: 24px;
            display: block;
            text-transform: uppercase;
          }

          .mobile-navigation :global(.navigation-item) {
            margin: 0 24px;
            display: flex;
            height: 48px;
            align-items: center;
            font-size: 1rem;
            color: #444;
          }

          .mobile-navigation .section :global(.navigation-item) {
            border-bottom: 1px solid #EAEAEA;
          }

          .mobile-navigation .section .group.has-nav :global(.navigation-item.active) {
            border-color: transparent;
          }

          .mobile-navigation :global(.navigation-item a) {
            font-size: 1rem;
            padding: 0;
            color: currentColor;
          }

          .mobile-navigation .group.active, .mobile-navigation :global(.navigation-item.active a) {
            color: #000
          }

          .mobile-navigation .navigation {
            background: #F9F9F9;
            padding: 16px 24px;
            border-top: 1px solid #EAEAEA;
            border-bottom 1px solid #EAEAEA;
          }

          .mobile-navigation .navigation :global(a) {
            font-size: 1rem;
          }

          :global(.header .feedback-link) {
            display: inherit;
          }

          :global(.header .left-nav),
          :global(.header .right-nav) {
            flex: 1 1 100%;
            display: flex;
          }

          :global(.header .right-nav) {
            justify-content: flex-end;
          }

          :global(.header .main-navigation) {
            width: 100%;
            display: flex;
          }

          :global(.header .main-navigation .navigation-items) {
            flex: 1 0 auto;
            display: flex;
          }

          :global(.header .main-navigation .developer-dropdown) {
            display: flex;
          }

          :global(.header .main-navigation .developer-dropdown.active > span) {
            color: var(--geist-foreground);
            font-weight: 500;
          }

          :global(.header .main-navigation .developer-dropdown a) {
            padding: 0;
          }

          :global(.header-wrapper .mobile-only) {
            display: none;
          }

          :global(.header .user-navigation) {
          }

          @keyframes load {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          :global(.header .user-navigation) {
            animation-name: load;
            animation-duration: 1s;
            padding-right: 0;
          }

          .avatar-wrapper {
            margin-left: 8px;
          }

          :global(.header .menu-arrow) {
            display: none;
            height: 40px;
            width: 40px;
            margin: 0 -10px;
          }

          .logo {
            display: flex;
          }

          .search-wrapper {
            opacity: 1;
            visibility: visible;
            transition: visibility 0s linear 0s, opacity 300ms;
            width: 100%;
            display: inline-flex;
            justify-content: center;
          }

          .search-wrapper.hidden {
            visibility: hidden;
            opacity: 0;
            transition: visibility 0s linear 300ms, opacity 300ms;
          }

          :global(.geist-feedback-input:not(.focused) > textarea) {
            height: 24px ${isAmp ? '' : '!important'};
            top: 0 ${isAmp ? '' : '!important'};
          }

          @media screen and (max-width: 950px) {
            .mobile-navigation {
              height: auto;
            }

            :global(.header .main-navigation),
            :global(nav.user-navigation) {
              display: none;
            }

            :global(.header .menu-arrow) {
              display: block;
            }

            :global(.header .main-navigation.active) {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              left: 0;
              right: 0;
              top: 85px;
              padding: 0;
              background: white;
              box-shadow: #fff 0 -15px, rgba(0, 0, 0, 0.1) 0 0 15px;
              border-bottom: 1px solid #eaeaea;
            }
            :global(.header .main-navigation.active > span) {
              width: 100%;
              padding: 0 15px;
              border-top: 1px solid #eaeaea;
            }

            :global(.header .main-navigation .desktop-only) {
              display: none;
            }

            :global(.header-wrapper .mobile-only) {
              display: block;
            }

            :global(.header .main-navigation .navigation-items) {
              flex-wrap: nowrap;
              padding: 8px 16px;
              border-top: 1px solid #eaeaea;
              overflow-x: auto;
              display: flex;
              width: 100%;
              white-space: nowrap;
            }

            :global(.header .main-navigation .navigation-item a) {
              padding: 8px;
            }

            :global(.header .navigation-sidebar) {
              margin-top: 14px;
              margin-left: 32px;
            }
          }

          :global(.header-hidden) {
            top: -80px;
          }
        `}</style>
      </div>
    )
  }
}

export default withRouter(Header)

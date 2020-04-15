import { Component } from 'react'
import cn from 'classnames'
import { withRouter } from 'next/router'

import * as PopOver from '~/components/popover'
import PopOverLink from '~/components/popover/popover-link'
import Badge from '~/components/badge'
import Link from '~/components/text/link'

export class MenuPopOver extends Component {
  state = { isOpen: false }
  timer = null

  open = () => {
    this.timer = setTimeout(() => this.setState({ isOpen: true }), 100)
  }

  close = () => {
    clearTimeout(this.timer)
    this.setState({ isOpen: false })
  }

  render() {
    const {
      dashboard,
      clickable,
      title,
      router,
      primaryTitle,
      secondaryTitle,
      primaryList,
      secondaryList,
      offsetLeft
    } = this.props

    return (
      <span
        className={cn({ 'is-active': this.state.isOpen })}
        onMouseEnter={clickable ? undefined : this.open}
        onMouseLeave={clickable ? undefined : this.close}
        onClick={clickable && this.open}
      >
        {title}
        <PopOverLink
          withArrow={!dashboard}
          hideOnClick={clickable}
          isOpen={clickable ? undefined : this.state.isOpen}
          offsetLeft={offsetLeft}
          offsetTop={0}
          to={
            <PopOver.Menu tipOffset={60} noPadding width={180}>
              <div className="wrapper">
                {primaryList && (
                  <aside className="left">
                    {primaryTitle && (
                      <div className="header">
                        <h5>{primaryTitle}</h5>
                      </div>
                    )}
                    <div className="content">
                      {primaryList.map((item, index) => {
                        return (
                          <PopOver.Item
                            key={index}
                            noPadding
                            separated={item.separated}
                            fullWidth
                            active={router.pathname === item.url}
                          >
                            <Link href={item.href || item.url} as={item.url}>
                              {item.title}
                              {item.isHot && (
                                <>
                                  {'    '}
                                  <Badge type="lite" uppercase>
                                    Hot
                                  </Badge>
                                </>
                              )}
                            </Link>
                          </PopOver.Item>
                        )
                      })}
                    </div>
                  </aside>
                )}

                {secondaryList && (
                  <aside className="right">
                    {secondaryTitle && (
                      <div className="header">
                        <h5>{secondaryTitle}</h5>
                      </div>
                    )}
                    <div className="content">
                      {secondaryList.map((item, index) => {
                        return (
                          <PopOver.Item
                            key={index}
                            noPadding
                            fullWidth
                            active={router.pathname === item.url}
                          >
                            <Link href={item.url}>{item.title}</Link>
                          </PopOver.Item>
                        )
                      })}
                    </div>
                  </aside>
                )}
              </div>
            </PopOver.Menu>
          }
        />
        <style jsx>{`
          span {
            display: none;
            visibility: hidden;
            user-select: none;
            border: 0;
            font-size: 14px;
            color: var(--accents-5);
            padding: 0 10px;
            transition: all 200ms ease;
            cursor: pointer;
          }

          span:hover,
          span.is-active :global(.wrap .link .arrow),
          span.is-active {
            color: var(--geist-foreground);
            fill: var(--geist-foreground);
          }

          a {
            font-size: 14px;
            text-decoration: none;
          }

          .wrapper {
            display: grid;
            grid-template-columns: ${primaryList && secondaryList
              ? '1fr 1fr'
              : '1fr'};
            grid-template-areas: 'left right' 'footer footer';
            border-radius: 5px;
            overflow: hidden;
          }

          .header h5 {
            margin: 0;
            color: var(--geist-foreground);
            font-weight: 500;
          }

          .footer:hover .arrow {
            animation: arrowAnimation 1s cubic-bezier(0.42, 0, 0.58, 1) infinite;
          }

          @keyframes arrowAnimation {
            50% {
              transform: translateX(70%);
            }
            80%,
            100% {
              opacity: 0;
            }
          }

          .footer,
          .header + .content {
            border-top: 1px solid var(--accents-2);
          }

          .header,
          .content,
          .footer {
            padding: 19px;
          }

          .content :global(.item:first-child a) {
            padding-top: 0;
          }

          .content :global(.item:last-child a) {
            padding-bottom: 0;
          }

          .content :global(.badge) {
            margin-left: 8px;
            padding: 0 5px;
          }

          :global(.item.dark .badge) {
            background: #333;
            color: #999;
          }

          .wrapper .left {
            grid-area: left;
          }

          .wrapper .right {
            grid-area: right;
            background-color: var(--accents-1);
          }

          .footer {
            grid-area: footer;
            display: flex;
            align-items: center;
          }

          .footer span {
            color: var(--accents-5);
            padding: 0;
            vertical-align: middle;
            line-height: 20px;
            transition: color 200ms ease;
          }

          .footer:hover span {
            color: var(--geist-foreground);
          }

          .footer .label,
          .footer .icon,
          .footer .arrow {
            display: flex;
          }

          .footer .icon {
            margin-right: 10px;
          }

          .footer .label,
          .footer .arrow {
            margin-left: 10px;
          }

          @media (min-width: 951px) {
            span {
              display: flex;
              visibility: visible;
              align-items: center;
            }
          }
        `}</style>
      </span>
    )
  }
}

export default withRouter(MenuPopOver)

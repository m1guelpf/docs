import React from 'react'
import PermalinkIcon from '~/components/icons/permalink'

class Heading extends React.Component {
  render() {
    const { component, className, children, ...rest } = this.props
    return React.cloneElement(
      component,
      {
        className: [className, component.props.className || ''].join(' '),
        ...rest
      },
      children
    )
  }
}

export default props => {
  const { offsetTop } = props
  const component = props.children
  const children = component.props.children || ''

  let id = props.id
  let text = children

  if (null == id) {
    if (typeof children === 'object' && !Array.isArray(children)) {
      // if the child is a component, convert it to its children
      text = children.props.name || children.props.children
    } else if (Array.isArray(children)) {
      // If there are sub components, convert them to text
      text = children
        .map(child => {
          return typeof child === 'object'
            ? child.props.name || child.props.children
            : child
        })
        .join('')
    }

    id = text
      .toLowerCase()
      .replace(/\s/g, '-')
      .replace(/[?!]/g, '')
  }

  const href = props.noAnchor ? '#' : '#' + id

  const targetStyle =
    null != offsetTop
      ? { marginTop: -offsetTop + 'px', paddingTop: offsetTop + 'px' }
      : null
  return (
    <Heading
      className={props.lean ? 'lean' : ''}
      component={component}
      data-components-heading
    >
      <span id={id} className="target" style={targetStyle} />
      <a href={href}>{children}</a>
      <span className="permalink">
        <PermalinkIcon size={11} />
      </span>
      <style jsx>
        {`
          a {
            border-bottom: 1px solid transparent;
            color: inherit;
            cursor: pointer;
            margin-right: 10px;
            text-decoration: none;
          }

          a:hover {
            border-bottom-color: inherit;
          }

          .target {
            display: block;
            margin-top: -20px;
            padding-top: 20px;
            visibility: hidden;
            position: absolute;
          }

          .permalink {
            text-align: center;
            vertical-align: middle;
            visibility: hidden;
            top: -6px;
            position: relative;
          }

          a:hover ~ .permalink {
            visibility: visible;
          }
        `}
      </style>
    </Heading>
  )
}

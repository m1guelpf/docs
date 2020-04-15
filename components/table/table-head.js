import React, { Component, cloneElement, Children } from 'react'
import PropTypes from 'prop-types'

class TableHead extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    noTagName: PropTypes.bool
  }

  render() {
    const { children, innerRef, noTagName, ...other } = this.props
    return (
      <thead {...other} ref={innerRef}>
        {Children.map(children, (child, index) => {
          if (!child) return null
          return cloneElement(child, {
            column: index,
            tagName: noTagName ? undefined : 'th'
          })
        })}
      </thead>
    )
  }
}

export default TableHead

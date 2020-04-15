import { Component } from 'react'
import PropTypes from 'prop-types'
import { CSSVariables } from '~/lib/css-config'
import SyntaxHighlightingStyles from '~/lib/syntax-highlighting-css'

export default class Page extends Component {
  static contextTypes = {
    darkBg: PropTypes.bool
  }

  static getChildContext() {
    return {
      darkBg: this.props.darkBg || false
    }
  }

  render() {
    return (
      <div className="page" itemScope itemType="http://schema.org/WebPage">
        {this.props.children}
        <CSSVariables />
        <style jsx global>{`
          html {
            height: 100%;
            box-sizing: border-box;
          }

          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }

          a {
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          }

          body {
            font-family: var(--font-sans);
            margin: 0;
            min-height: 100%;
            position: relative;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
          }

          html,
          body {
            background-color: ${this.props.darkBg ? '#000' : '#fff'};
            color: ${this.props.darkBg ? '#fff' : '#000'};
          }

          .page {
            margin: 0 auto;
            max-width: 100%;
            position: relative;
            padding-top: 40px;
          }

          ::selection {
            background-color: #79ffe1;
            color: #000;
          }
        `}</style>
        <style jsx global>
          {SyntaxHighlightingStyles}
        </style>
      </div>
    )
  }
}

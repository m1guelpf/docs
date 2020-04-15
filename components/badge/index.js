import { memo } from 'react'
import PropTypes from 'prop-types'

const Badge = memo(
  ({
    content,
    backgroundColor = '#f00',
    fontColor = '#fff',
    hoverBackgroundColor
  }) => {
    const isNumber = typeof content === 'number' ? true : false

    return (
      <span className="badge">
        {content}
        <style jsx>
          {`
            .badge {
              color: ${fontColor};
              background: ${backgroundColor};
              display: inline-block;
              font-size: 10px;
              font-weight: ${isNumber ? 'bold' : 'normal'};
              padding: ${isNumber ? '0 4px' : ' 0px 10px'};
              text-transform: uppercase;
              min-height: ${isNumber ? '14px' : '20px'};
              min-width: 15px;
              line-height: ${isNumber ? '14px' : '20px'};
              border-radius: ${isNumber
                ? content.length < 10
                  ? '8px'
                  : '7px'
                : '20px'};
              text-align: center;
              vertical-align: middle;
              transition: 0.2s ease;
            }
            .badge:hover {
              background: ${hoverBackgroundColor || backgroundColor};
            }
          `}
        </style>
      </span>
    )
  }
)

Badge.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  backgroundColor: PropTypes.string,
  fontColor: PropTypes.string,
  hoverBackgroundColor: PropTypes.string
}

export default Badge

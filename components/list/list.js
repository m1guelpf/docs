import React from 'react'

function Item({ columns, halfGap, children }) {
  return (
    <div className="geist-list-item">
      {children}
      <style jsx>{`
        .geist-list-item {
          padding: ${halfGap
            ? 'var(--geist-gap-quarter)'
            : 'var(--geist-gap-half)'};
          flex-grow: 0;
          flex-basis: ${100 / columns[0]}%;
          min-width: 0;
        }

        @media screen and (max-width: 960px) {
          .geist-list-item {
            flex-basis: ${100 / columns[1]}%;
          }
        }

        @media screen and (max-width: 600px) {
          .geist-list-item {
            flex-basis: ${100 / columns[2]}%;
          }
        }
      `}</style>
    </div>
  )
}

export default function List({
  columnsDesktop = 1,
  columnsTablet = 1,
  columnsMobile = 1,
  halfGap = false,
  children
}) {
  // need to wrap each child with a `<Item>`
  return (
    <div className="geist-list">
      {React.Children.map(children, child =>
        child ? (
          <Item
            halfGap={halfGap}
            columns={[+columnsDesktop, +columnsTablet, +columnsMobile]}
          >
            {child}
          </Item>
        ) : (
          undefined
        )
      )}
      <style jsx>{`
        .geist-list {
          display: flex;
          flex-wrap: wrap;
          margin: 0
            ${halfGap
              ? 'var(--geist-gap-quarter-negative)'
              : 'var(--geist-gap-half-negative)'};
        }
      `}</style>
    </div>
  )
}

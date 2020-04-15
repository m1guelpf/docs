import { Children, useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const Tabs = ({
  children,
  tabs,
  disabled,
  selected,
  defaultSelected = 0,
  onChange
}) => {
  let [activeTab, setActiveTab] = useState(defaultSelected)
  // override if it exists
  activeTab = selected || activeTab

  return (
    <div className={cn('tabs', { disabled })}>
      <div className="tabs-row">
        {tabs.map((tabName, index) => (
          <button
            key={'tab-' + index}
            className="tab"
            disabled={index === activeTab}
            onClick={() => {
              if (disabled) return
              if (typeof selected === 'undefined') {
                setActiveTab(index)
              }
              onChange && onChange(index)
            }}
          >
            {tabName}
          </button>
        ))}
      </div>
      {children
        ? Children.map(children, (tab, index) =>
            index === activeTab ? tab : null
          )
        : null}
      <style jsx>{`
        .tab {
          height: 34px;
          padding: 0 24px;
          user-select: none;
          color: #999;
          font-size: 16px;
          overflow: hidden;
          transition: border 0.2s ease, background 0.2s ease, color 0.2s ease;
          border-radius: 0;
          white-space: nowrap;
          text-decoration: none;
          text-transform: capitalize;
          line-height: 0;
          appearance: none;
          outline: none;
          cursor: pointer;
          border: 0;
          position: relative;
          z-index: 1;
          border-bottom: 1px solid var(--accents-2);
        }

        .tab::after {
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 1px;
          background: var(--accents-2);
          content: '';
          transition: background 0.12s ease;
        }

        .tab[disabled] {
          position: relative;
          z-index: 1;
          color: var(--geist-foreground);
          background: var(--geist-background);
          border-color: var(--geist-foreground);
          cursor: default;
        }

        .tab[disabled]::after {
          height: 2px;
          background: var(--geist-foreground);
        }

        .tabs :global(._fieldset) {
          border-top-left-radius: 0;
          overflow: hidden;
        }

        .tabs.disabled {
          pointer-events: none;
        }

        .tabs.disabled .tab {
          background: var(--accents-1);
          color: #999;
          border-bottom: 1px solid var(--accents-1);
        }

        .tabs-row {
          white-space: nowrap;
          overflow-y: hidden;
          overflow-x: auto;
          position: relative;
          margin-bottom: 32px;
        }

        .tabs-row::after {
          height: 1px;
          width: 100%;
          position: absolute;
          content: '';
          bottom: 0;
          left: 0;
          background: var(--accents-2);
        }
      `}</style>
    </div>
  )
}

Tabs.propTypes = {
  children: PropTypes.array.isRequired
}

export default Tabs

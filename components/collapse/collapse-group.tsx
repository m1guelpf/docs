import React, { useState, useEffect } from 'react'
import { Provider } from './collapse-context'

const CollapseGroup = ({
  children,
  hashToTitle
}: {
  children: React.ReactNode
  hashToTitle?: Record<string, string>
}) => {
  const [selected, setSelected] = useState('')
  const [initialScrollTarget, setInitialScrollTarget] = useState('')
  const onChange = (title: string) => {
    setSelected(title)
  }

  useEffect(() => {
    const hash = location.hash.substring(1)
    if (hashToTitle && hashToTitle[hash]) {
      setSelected(hashToTitle[hash])
      setInitialScrollTarget(hashToTitle[hash])
    }
  }, [])

  return (
    <div className="collapse-group">
      <Provider
        value={{
          selected,
          initialScrollTarget,
          onChange
        }}
      >
        {children}
      </Provider>
      <style jsx>{`
        .collapse-group {
          border-top: 1px solid var(--accents-2);
        }
      `}</style>
    </div>
  )
}

export default CollapseGroup

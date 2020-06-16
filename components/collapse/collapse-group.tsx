import React, { useState } from 'react'
import { Provider } from './collapse-context'

const CollapseGroup = ({ children }: { children: React.ReactNode }) => {
  const [selected, setSelected] = useState('')
  const onChange = (title: string) => {
    setSelected(title)
  }

  return (
    <div className="collapse-group">
      <Provider value={{ selected, onChange }}>
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

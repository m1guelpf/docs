import React, { useContext } from 'react'

export const DisabledContext = React.createContext()
DisabledContext.displayName = 'DisabledContext'

export const useDisabled = () => useContext(DisabledContext)

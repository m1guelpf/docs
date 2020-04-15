import React, { useContext } from 'react'

const CollapseContext = React.createContext()
export const Provider = CollapseContext.Provider
export const Consumer = CollapseContext.Consumer
export const useCollapse = () => useContext(CollapseContext)

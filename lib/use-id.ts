import { useState, useEffect } from 'react'

let i = 0
const genId = () => ++i

const useID = (prefix?: string) => {
  const [id, setId] = useState('')
  useEffect(() => setId(`${prefix || ''}${genId()}`), [prefix])
  return id
}

export default useID
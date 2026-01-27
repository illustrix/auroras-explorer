import { type FC, useMemo, useState } from 'react'
import { ExplorerContext } from './context'

export const ExplorerContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cx, setCx] = useState('NC1')
  const [mat, setMat] = useState('VOE')

  const value = useMemo(() => {
    return { cx, setCx, mat, setMat }
  }, [cx, mat])

  return (
    <ExplorerContext.Provider value={value}>
      {children}
    </ExplorerContext.Provider>
  )
}

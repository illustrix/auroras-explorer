import { type FC, useMemo, useState } from 'react'
import { ExplorerContext } from './context'

export const ExplorerContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cx, setCx] = useState<string | undefined>('NC1')
  const [mat, setMat] = useState<string | undefined>('AU')
  const [building, setBuilding] = useState<string>()

  const value = useMemo(() => {
    return { cx, setCx, mat, setMat, building, setBuilding }
  }, [cx, mat, building])

  return (
    <ExplorerContext.Provider value={value}>
      {children}
    </ExplorerContext.Provider>
  )
}

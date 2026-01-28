import { createContext, useContext } from 'react'

export const ExplorerContext = createContext<{
  cx?: string
  setCx: (cx?: string) => void
  mat?: string
  setMat: (mat?: string) => void
  building?: string
  setBuilding: (building?: string) => void
}>({
  setCx: () => {},
  setMat: () => {},
  setBuilding: () => {},
})

export const useExplorerContext = () => {
  return useContext(ExplorerContext)
}

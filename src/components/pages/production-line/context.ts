import { createContext, useContext } from 'react'

export const ExplorerContext = createContext<{
  cx: string
  setCx: (cx: string) => void
  mat: string
  setMat: (mat: string) => void
}>({
  cx: '',
  setCx: () => {},
  mat: '',
  setMat: () => {},
})

export const useExplorerContext = () => {
  return useContext(ExplorerContext)
}

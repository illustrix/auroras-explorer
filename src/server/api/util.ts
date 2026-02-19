import { compact } from 'es-toolkit'

export const parseArray = (str?: string) => {
  if (!str) return
  return compact(str.split(',').map(s => s.trim()))
}

export const parseRange = (str?: string) => {
  if (!str) return
  const [fromStr, toStr] = str.split('..').map(s => s.trim())
  const from = fromStr ? Number(fromStr) : undefined
  const to = toStr ? Number(toStr) : undefined
  return { from, to }
}

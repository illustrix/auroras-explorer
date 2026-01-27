import type {
  Building,
  CommodityExchange,
  Material,
  Recipe,
  TradingSummary,
} from './types'

export * from './types'

const fioBaseUrl = 'https://rest.fnar.net'

export const getOrdersData = async () => {
  // https://rest.fnar.net/exchange/full
  const res = await fetch(`${fioBaseUrl}/exchange/full`)
  const data = await res.json()
  return data as TradingSummary[]
}

export const getAllMaterials = async () => {
  // https://rest.fnar.net/material/allmaterials
  const res = await fetch(`${fioBaseUrl}/material/allmaterials`)
  const data = await res.json()
  return data as Material[]
}

export const getAllRecipes = async () => {
  // https://rest.fnar.net/recipes/allrecipes
  const res = await fetch(`${fioBaseUrl}/recipes/allrecipes`)
  const data = await res.json()
  return data as Recipe[]
}

export const getAllExchanges = async () => {
  // https://rest.fnar.net/global/comexexchanges
  const res = await fetch(`${fioBaseUrl}/global/comexexchanges`)
  const data = await res.json()
  return data as CommodityExchange[]
}

export const getAllBuildings = async () => {
  // https://rest.fnar.net/building/allbuildings
  const res = await fetch(`${fioBaseUrl}/building/allbuildings`)
  const data = await res.json()
  return data as Building[]
}

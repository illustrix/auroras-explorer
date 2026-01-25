import { queryOptions, useQuery } from '@tanstack/react-query'
import * as fio from '@/lib/fio'
import { getDataWithCache } from './fs'

export interface GameData {
  materialsByTicker: Record<string, fio.Material>
  orders: fio.TradingSummary[]
  recipes: fio.Recipe[]
}

const loadGameData = async (): Promise<GameData> => {
  const [ordersData, allMaterials, allRecipes] = await Promise.all([
    getDataWithCache(fio.getOrdersData, 'ordersData'),
    getDataWithCache(fio.getAllMaterials, 'allMaterials'),
    getDataWithCache(fio.getAllRecipes, 'allRecipes'),
  ])

  const dataStore: GameData = {
    materialsByTicker: {},
    orders: ordersData,
    recipes: allRecipes,
  }

  for (const material of allMaterials) {
    dataStore.materialsByTicker[material.Ticker] = material
  }

  return dataStore
}

const gameDataQuery = queryOptions({
  queryKey: ['gameData'],
  queryFn: loadGameData,
  staleTime: Infinity,
})

export const useGameData = () => useQuery(gameDataQuery)

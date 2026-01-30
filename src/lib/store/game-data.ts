import { queryOptions, useQuery } from '@tanstack/react-query'
import * as fio from '@/lib/fio'
import { getDataWithCache } from './fs'

export interface GameData {
  materials: fio.Material[]
  materialsByTicker: Record<string, fio.Material>
  orders: fio.TradingSummary[]
  recipes: fio.Recipe[]
  exchanges: fio.CommodityExchange[]
  buildings: fio.Building[]
  buildingsByTicker: Record<string, fio.Building>
}

const loadGameData = async (): Promise<GameData> => {
  const [orders, materials, recipes, exchanges, buildings] = await Promise.all([
    getDataWithCache(fio.getOrdersData, 'orders', {
      expiryMs: 1000 * 60 * 5, // 5 minutes
    }),
    getDataWithCache(fio.getAllMaterials, 'materials'),
    getDataWithCache(fio.getAllRecipes, 'recipes'),
    getDataWithCache(fio.getAllExchanges, 'exchanges'),
    getDataWithCache(fio.getAllBuildings, 'buildings'),
  ])

  const dataStore: GameData = {
    materials: materials.toSorted((a, b) => a.Ticker.localeCompare(b.Ticker)),
    materialsByTicker: {},
    orders,
    recipes,
    exchanges,
    buildings: buildings.toSorted((a, b) => a.Ticker.localeCompare(b.Ticker)),
    buildingsByTicker: {},
  }

  for (const material of materials) {
    dataStore.materialsByTicker[material.Ticker] = material
  }

  for (const building of buildings) {
    dataStore.buildingsByTicker[building.Ticker] = building
  }

  return dataStore
}

const gameDataQuery = queryOptions({
  queryKey: ['gameData'],
  queryFn: loadGameData,
  staleTime: Infinity,
})

export const useGameData = () => useQuery(gameDataQuery)

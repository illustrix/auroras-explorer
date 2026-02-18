import { assert } from './assert'
import type { Recipe, TradingSummary } from './fio'
import type { GameData } from './store'

// CX -> Ticker -> TradingSummary
const caches: Map<string, Map<string, TradingSummary>> = new Map()

const indexOrdersByTicker = (orders: TradingSummary[]) => {
  if (caches.size > 0) return
  for (const order of orders) {
    if (!caches.has(order.ExchangeCode)) {
      caches.set(order.ExchangeCode, new Map())
    }
    const cx = caches.get(order.ExchangeCode)
    assert(cx)
    cx.set(order.MaterialTicker, order)
  }
}

export const getTradingSummariesByMaterial = (
  orders: TradingSummary[],
  ticker: string,
) => {
  indexOrdersByTicker(orders)
  const summaries: Record<string, TradingSummary> = {}
  for (const [, cache] of caches) {
    const summary = cache.get(ticker)
    if (summary) {
      summaries[summary.ExchangeCode] = summary
    }
  }
  return ['AI1', 'CI1', 'IC1', 'NC1', 'CI2', 'NC2']
    .map(cx => summaries[cx])
    .filter(Boolean) as TradingSummary[]
}

export const calculateRecipeDailyProfit = (
  allOrders: TradingSummary[],
  recipe: Recipe,
  cx: string,
) => {
  indexOrdersByTicker(allOrders)
  const maxRunsPerDay = Math.floor(86400000 / recipe.TimeMs)
  let inputCostPerRun = 0
  for (const input of recipe.Inputs) {
    const order = caches.get(cx)?.get(input.Ticker)
    assert(order, `No trading summary for ${input.Ticker} in exchange ${cx}`)
    inputCostPerRun += order.Ask * input.Amount
  }
  let outputRevenuePerRun = 0
  for (const output of recipe.Outputs) {
    const order = caches.get(cx)?.get(output.Ticker)
    assert(order, `No trading summary for ${output.Ticker} in exchange ${cx}`)
    outputRevenuePerRun += order.Bid * output.Amount
  }
  return (outputRevenuePerRun - inputCostPerRun) * maxRunsPerDay
}

export const getInfraNeedsForBuilding = (
  gameData: GameData,
  buildingTicker: string,
): { ticker: string; amount: number }[] => {
  const building = gameData.buildingsByTicker[buildingTicker]
  assert(building, `No building found for ticker ${buildingTicker}`)
  const needs: { ticker: string; amount: number }[] = []
  if (building.Pioneers > 0)
    needs.push({ ticker: 'HB1', amount: building.Pioneers / 100 })
  if (building.Settlers > 0)
    needs.push({ ticker: 'HB2', amount: building.Settlers / 100 })
  if (building.Technicians > 0)
    needs.push({ ticker: 'HB3', amount: building.Technicians / 100 })
  if (building.Engineers > 0)
    needs.push({ ticker: 'HB4', amount: building.Engineers / 100 })
  if (building.Scientists > 0)
    needs.push({ ticker: 'HB5', amount: building.Scientists / 100 })
  return needs
}

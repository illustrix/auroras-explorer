import { compact } from 'es-toolkit'
import type { GameData } from '@/server/services/game-data'
import { assert } from './assert'
import { allExchanges } from './constants'
import type { Recipe, TradingSummary } from './fio'

export const getTradingSummariesByMaterial = (
  data: GameData,
  ticker: string,
) => {
  const summaries: Record<string, TradingSummary> = {}
  for (const cx of allExchanges) {
    const summary = data.getTradingSummaryByCx(cx)?.get(ticker)
    if (summary) {
      summaries[summary.ExchangeCode] = summary
    }
  }
  return compact(allExchanges.map(cx => summaries[cx]))
}

export const calculateRecipeDailyProfit = (
  data: GameData,
  recipe: Recipe,
  cx: string,
) => {
  const maxRunsPerDay = Math.floor(86400000 / recipe.TimeMs)
  let inputCostPerRun = 0
  for (const input of recipe.Inputs) {
    const order = data.getTradingSummaryByCx(cx)?.get(input.Ticker)
    assert(order, `No trading summary for ${input.Ticker} in exchange ${cx}`)
    inputCostPerRun += order.Ask * input.Amount
  }
  let outputRevenuePerRun = 0
  for (const output of recipe.Outputs) {
    const order = data.getTradingSummaryByCx(cx)?.get(output.Ticker)
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

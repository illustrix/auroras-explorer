import { queryOptions, useQuery } from '@tanstack/react-query'
import { createStore, useStore } from 'zustand'
import { GameDataService } from '@/server/services/game-data'
import { fsCache } from './fs'

interface DataLoadingState {
  progress: number
  rate: number
  setProgress: (progress: number) => void
  setRate: (rate: number) => void
}

const dataLoadingStateStore = createStore<DataLoadingState>(set => ({
  progress: 0,
  rate: 0,
  setProgress: (progress: number) => set({ progress }),
  setRate: (rate: number) => set({ rate }),
}))

export const useDataLoadingState = () => useStore(dataLoadingStateStore)

const gameDataService = new GameDataService(fsCache)

const gameDataQuery = queryOptions({
  queryKey: ['gameData'],
  queryFn: () => gameDataService.loadAll(),
})

export const useGameData = () => useQuery(gameDataQuery)

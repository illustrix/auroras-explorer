import type { ColumnDef, Table } from '@tanstack/react-table'
import { createContext, useContext } from 'react'
import type { Acquisition, AcquisitionSummary } from '@/lib/trade'

export const ShipmentContext = createContext<{
  fromCX: string
  setFromCX: (cx: string) => void
  toCX: string
  setToCX: (cx: string) => void
  weightCapacity: number
  setWeightCapacity: (weightCapacity: number) => void
  volumeCapacity: number
  setVolumeCapacity: (volumeCapacity: number) => void
  result?: AcquisitionSummary
  table: Table<Acquisition>
  columns: ColumnDef<Acquisition>[]
}>({
  fromCX: '',
  setFromCX: () => {},
  toCX: '',
  setToCX: () => {},
  weightCapacity: 0,
  setWeightCapacity: () => {},
  volumeCapacity: 0,
  setVolumeCapacity: () => {},
  table: {} as Table<Acquisition>,
  columns: [],
})

export const useShipmentContext = () => {
  return useContext(ShipmentContext)
}

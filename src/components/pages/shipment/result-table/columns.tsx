import { createColumnHelper, type Table } from '@tanstack/react-table'
import { sumBy } from 'es-toolkit'
import { MaterialTile } from '@/components/game/material-tile'
import { Checkbox } from '@/components/ui/checkbox'
import { formatCurrency } from '@/lib/format'
import type { Acquisition } from '@/lib/trade'

const columnHelper = createColumnHelper<Acquisition>()

export const getRows = (table: Table<Acquisition>) => {
  const selectedRowModel = table.getSelectedRowModel()
  const rowModel = table.getRowModel()

  return selectedRowModel.rows.length > 0
    ? selectedRowModel.rows
    : rowModel.rows
}

export const getColumns = (props: { fromCX: string; toCX: string }) => [
  columnHelper.display({
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    footer: 'Total',
    enableSorting: false,
    enableHiding: false,
    size: 20,
  }),
  columnHelper.accessor('materialTicker', {
    header: 'Material',
    cell: row => {
      return <MaterialTile ticker={row.getValue()} className="h-6 text-xs" />
    },
    maxSize: 60,
  }),
  columnHelper.accessor('costPerItem', {
    id: 'ask',
    header: `${props.fromCX} Ask`,
    cell: row => (
      <div className="text-right">{formatCurrency(row.getValue())}</div>
    ),
    maxSize: 60,
  }),
  columnHelper.accessor('sellingPricePerItem', {
    header: `${props.toCX} Bid`,
    cell: row => (
      <div className="text-right">{formatCurrency(row.getValue())}</div>
    ),
    maxSize: 60,
  }),
  columnHelper.accessor(row => row.costPerItem - row.sellingPricePerItem, {
    id: 'spread',
    header: 'Spread',
    cell: row => {
      return (
        <div className="flex items-center gap-1 justify-between">
          {formatCurrency(row.getValue())}
          <span className="text-sm text-muted-foreground">
            {((row.getValue() / row.row.original.costPerItem) * 100).toFixed(2)}
            %
          </span>
        </div>
      )
    },
    maxSize: 80,
  }),
  columnHelper.accessor('count', {
    header: 'Amount',
    meta: { align: 'right' },
    cell: row => (
      <div className="text-right">{row.getValue().toLocaleString()}</div>
    ),
    footer: ({ table }) => {
      return (
        <div className="text-right">
          {sumBy(getRows(table), row => row.original.count).toLocaleString()}
        </div>
      )
    },
    maxSize: 80,
  }),
  columnHelper.accessor('profit', {
    header: 'Profit',
    cell: row => (
      <div className="text-right">{formatCurrency(row.getValue())}</div>
    ),
    footer: ({ table }) => {
      return (
        <div className="text-right">
          {formatCurrency(sumBy(getRows(table), row => row.original.profit))}
        </div>
      )
    },
    maxSize: 80,
  }),
  columnHelper.accessor('totalSellingPrice', {
    header: 'Cost',
    cell: row => (
      <div className="text-right">{formatCurrency(row.getValue())}</div>
    ),
    footer: ({ table }) => {
      return (
        <div className="text-right">
          {formatCurrency(
            sumBy(getRows(table), row => row.original.totalSellingPrice),
          )}
        </div>
      )
    },
    maxSize: 80,
  }),
  columnHelper.accessor(
    row => ({ weight: row.totalWeight, volume: row.totalVolume }),
    {
      id: 'vol',
      header: 'Weight / Volume',
      cell: row => {
        const { weight, volume } = row.getValue()
        return (
          <div className="flex gap-4 text-right">
            <div className="min-w-14">{weight.toFixed(2)}t</div>
            <div className="min-w-14">{volume.toFixed(2)}m³</div>
          </div>
        )
      },
      footer: ({ table }) => {
        const totalWeight = sumBy(
          getRows(table),
          row => row.original.totalWeight,
        )
        const totalVolume = sumBy(
          getRows(table),
          row => row.original.totalVolume,
        )
        return (
          <div className="flex gap-4 text-right">
            <div className="min-w-14">{totalWeight.toFixed(2)}t</div>
            <div className="min-w-14">{totalVolume.toFixed(2)}m³</div>
          </div>
        )
      },
    },
  ),
]

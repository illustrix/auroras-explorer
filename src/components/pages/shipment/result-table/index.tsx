import { flexRender } from '@tanstack/react-table'
import type { FC } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useShipmentContext } from '../context'

export const ShipmentResultTable: FC = () => {
  const { table, columns } = useShipmentContext()

  const rowModel = table.getRowModel()

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rowModel.rows?.length ? (
            rowModel.rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            {table.getFooterGroups().map(footerGroup =>
              footerGroup.headers.map(footer => (
                <TableCell
                  key={footer.id}
                  colSpan={footer.colSpan}
                  style={{ width: footer.getSize() }}
                >
                  {footer.isPlaceholder
                    ? null
                    : flexRender(
                        footer.column.columnDef.footer,
                        footer.getContext(),
                      )}
                </TableCell>
              )),
            )}
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

import { useTranslation } from 'react-i18next'
import {
  flexRender,
  type Row,
  type Table as TanStackTable,
} from '@tanstack/react-table'
import { useState, type ComponentType, type MouseEvent } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export interface DataTableProps<T> {
  table: TanStackTable<T>
  collapsibleContent?: ComponentType<{
    row: Row<T>
  }>
  footer?: boolean
  onRowClick?: (e: MouseEvent, row: Row<T>) => void
}

export const DataTable = <T,>({
  table,
  footer,
  collapsibleContent: CustomCollapsibleContent,
  onRowClick,
}: DataTableProps<T>) => {
  const { t } = useTranslation()
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const rowModel = table.getRowModel()
  const footerGroups = table.getFooterGroups()

  const toggleRow = (rowId: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev)
      if (next.has(rowId)) {
        next.delete(rowId)
      } else {
        next.add(rowId)
      }
      return next
    })
  }

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
            rowModel.rows.map(row => {
              const isExpanded = expandedRows.has(row.id)

              return (
                <Collapsible
                  key={row.id}
                  open={isExpanded}
                  onOpenChange={() => toggleRow(row.id)}
                  asChild
                >
                  <>
                    <CollapsibleTrigger asChild>
                      <TableRow
                        data-state={row.getIsSelected() && 'selected'}
                        onClick={onRowClick ? e => onRowClick(e, row) : undefined}
                        className="cursor-pointer"
                      >
                        {row.getVisibleCells().map(cell => (
                          <TableCell
                            key={cell.id}
                            style={{ width: cell.column.getSize() }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </CollapsibleTrigger>
                    {CustomCollapsibleContent && (
                      <CollapsibleContent>
                        <TableRow>
                          <TableCell
                            colSpan={row.getVisibleCells().length}
                            className="bg-muted/50 p-4"
                          >
                            <CustomCollapsibleContent row={row} />
                          </TableCell>
                        </TableRow>
                      </CollapsibleContent>
                    )}
                  </>
                </Collapsible>
              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={100} className="h-24 text-center">
                {t('dataTable.noResults')}
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        {footer && (
          <TableFooter>
            <TableRow>
              {footerGroups.map(footerGroup =>
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
        )}
      </Table>
    </div>
  )
}

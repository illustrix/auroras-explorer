import type { Knex } from 'knex'
import { parseOrderBy } from '@/lib/order'

export interface Pagination<T> {
  items: T[]
  total: number
}

export interface PaginationOptions {
  limit?: number
  offset?: number
  order?: string
}

export const handleOrderBy = (
  query: Knex.QueryBuilder,
  orderBy: string = '',
  validFields: string[],
) => {
  for (const { field, direction } of parseOrderBy(orderBy, validFields)) {
    query.orderBy(field, direction)
  }
}

export const handlePaginationOptions = (
  query: Knex.QueryBuilder,
  opt: PaginationOptions,
) => {
  if (opt.limit) {
    query.limit(opt.limit)
  }
  if (opt.offset) {
    query.offset(opt.offset)
  }
}

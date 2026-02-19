import type { PaginationInstance } from '@/components/common/pagination'

export const getPaginationInstance = (
  pagination: {
    pageIndex: number
    pageSize: number
  },
  pageCount: number,
  setPagination: (pagination: { pageIndex: number; pageSize: number }) => void,
): PaginationInstance => {
  return {
    firstPage: () =>
      setPagination({ pageIndex: 0, pageSize: pagination.pageSize }),
    previousPage: () =>
      setPagination({
        pageIndex: pagination.pageIndex - 1,
        pageSize: pagination.pageSize,
      }),
    nextPage: () =>
      setPagination({
        pageIndex: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
      }),
    lastPage: () =>
      setPagination({
        pageIndex: pageCount - 1,
        pageSize: pagination.pageSize,
      }),
    getCanPreviousPage: () => pagination.pageIndex > 0,
    getCanNextPage: () => pagination.pageIndex < pageCount - 1,
    getPageCount: () => pageCount,
  }
}

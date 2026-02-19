import { queryOptions } from '@tanstack/react-query'
import type { DateRange } from 'react-day-picker'
import type { Pagination } from '@/server/common/paging'
import { apiClient } from '../api'
import type { Contract } from '../api/types'

interface GroupContractsParams {
  groupId: string
  page?: number
  pageSize?: number
  types?: string[]
  order?: string
  usernames?: string[]
  statuses?: string[]
  tags?: string[]
  time?: DateRange
}

export const groupContractsQuery = (opt: GroupContractsParams) => {
  const {
    groupId,
    usernames,
    types,
    statuses,
    tags,
    time,
    pageSize,
    ...params
  } = opt
  return queryOptions({
    queryKey: ['group-contracts', opt],
    queryFn: async () => {
      const res = await apiClient.get<Pagination<Contract>>(
        `/api/group/${groupId}/contracts`,
        {
          params: {
            ...params,
            types: types?.join(','),
            statuses: statuses?.join(','),
            tags: tags?.join(','),
            usernames:
              usernames && usernames.length > 0
                ? usernames.map(i => i.toUpperCase()).join(',')
                : undefined,
            page_size: pageSize,
            time:
              time?.from && time.to
                ? [time.from.valueOf(), time.to.valueOf()].join('..')
                : undefined,
          },
        },
      )
      return res.data
    },
    enabled: !!groupId,
  })
}

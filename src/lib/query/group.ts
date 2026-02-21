import { queryOptions } from '@tanstack/react-query'
import { apiClient } from '../api'
import type { UserInfo, UserPlan } from '../api/types'

export const groupUsersQuery = (groupId: string) => {
  return queryOptions({
    queryKey: ['group-users', groupId],
    queryFn: async () => {
      const res = await apiClient.get<UserInfo[]>(`/api/group/${groupId}/users`)
      return res.data
    },
  })
}

export const groupPlansQuery = (groupId: string) => {
  return queryOptions({
    queryKey: ['group-plans', groupId],
    queryFn: async () => {
      const res = await apiClient.get<UserPlan[]>(`/api/group/${groupId}/plans`)
      return res.data
    },
  })
}

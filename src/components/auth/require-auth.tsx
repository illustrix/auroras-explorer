import { useQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import type { FC, ReactNode } from 'react'
import { useLocalStorage } from '@/hooks/use-storage'
import { groupUsersQuery } from '@/lib/query/group'
import { ResultPage } from '../common/result'
import { LoginForm } from './login-form'

const routeApi = getRouteApi('/group/{-$groupId}')

export const RequireAuth: FC<{ children: ReactNode }> = ({ children }) => {
  const token = useLocalStorage('token')

  const { groupId = '' } = routeApi.useParams()
  const { error } = useQuery(groupUsersQuery(groupId))

  if (!token) {
    return <LoginForm />
  }

  if (error) {
    return (
      <ResultPage
        title="You don't have permission to access this page"
        description={`Current group tools are still in development, only available to invited users.
If you are interested in it, please contact me on Discord.`}
      />
    )
  }

  return <>{children}</>
}

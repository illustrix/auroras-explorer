import { queryOptions } from '@tanstack/react-query'
import { getSharedPlan } from '../planner'

export const sharedPlanQuery = (planId?: string) => {
  return queryOptions({
    queryKey: ['shared-plan', planId],
    queryFn: () => getSharedPlan(planId || ''),
    enabled: !!planId,
  })
}

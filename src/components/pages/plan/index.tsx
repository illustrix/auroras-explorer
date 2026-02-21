import { useQuery } from '@tanstack/react-query'
import type { FC } from 'react'
import { dialog } from 'redyc'
import { AutoOpenDialog } from '@/components/common/dialog/auto-open-dialog'
import { Button } from '@/components/ui/button'
import { apiClient } from '@/lib/api'
import { groupPlansQuery } from '@/lib/query/group'
import MdiLink from '~icons/mdi/link'
import { SetUserPlanDialog } from './set-user-plan'

export const GroupPlanPage: FC<{
  groupId: string
}> = ({ groupId }) => {
  const plans = useQuery(groupPlansQuery(groupId))
  return (
    <div className="p-4">
      <div className="w-full flex justify-between ">
        <h1>Group Plans</h1>
        <SetUserPlanDialog groupId={groupId} />
      </div>

      <div className="mt-4">
        {plans.data?.length === 0 && (
          <div className="text-muted-foreground">No plans found.</div>
        )}

        {plans.data?.map(plan => (
          <div
            key={plan.id}
            className="p-4 border rounded-md mb-2 flex flex-col gap-2"
          >
            <div className="flex items-center gap-4">
              {plan.planet}
              <Button variant="link" className="p-0" asChild>
                <a
                  href={`https://prunplanner.org/shared/${plan.plan}`}
                  target="_blank"
                >
                  <MdiLink />
                  Plan Link
                </a>
              </Button>
              <div>{plan.username}</div>
              <Button
                onClick={() => {
                  dialog(
                    <AutoOpenDialog>
                      <div>123</div>
                    </AutoOpenDialog>,
                  )
                }}
              >
                inspect
              </Button>
              <Button
                onClick={() => {
                  apiClient.delete(`/api/group/${groupId}/plan/${plan.id}`)
                }}
              >
                delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

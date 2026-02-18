import { createFileRoute } from '@tanstack/react-router'
import { RequireAuth } from '@/components/auth/require-auth'
import { GroupPriceWatchPage } from '@/components/pages/group/price-watch'

export const Route = createFileRoute('/group/{-$groupId}/price-watch/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { groupId = '' } = Route.useParams()

  if (!groupId) return null

  return (
    <RequireAuth>
      <GroupPriceWatchPage groupId={groupId} />
    </RequireAuth>
  )
}

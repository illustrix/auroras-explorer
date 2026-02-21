import { createFileRoute } from '@tanstack/react-router'
import { GroupPlanPage } from '@/components/pages/plan'

export const Route = createFileRoute('/group/{-$groupId}/plan/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { groupId } = Route.useParams()
  if (!groupId) return null
  return <GroupPlanPage groupId={groupId} />
}

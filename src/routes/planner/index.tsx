import { createFileRoute } from '@tanstack/react-router'
import { PlannerPage } from '@/components/pages/planner/planner-page'

export const Route = createFileRoute('/planner/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PlannerPage />
}

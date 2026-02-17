import { createFileRoute, Outlet } from '@tanstack/react-router'
import { RequireAuth } from '@/components/auth/require-auth'

export const Route = createFileRoute('/group/{-$groupId}')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <RequireAuth>
      <Outlet />
    </RequireAuth>
  )
}

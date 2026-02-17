import { createFileRoute } from '@tanstack/react-router'
import { ErrorPage } from '@/components/pages/error-page'

export const Route = createFileRoute('/error')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ErrorPage />
}

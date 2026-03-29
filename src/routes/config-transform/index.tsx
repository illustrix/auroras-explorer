import { createFileRoute } from '@tanstack/react-router'
import { ConfigTransformPage } from '@/components/pages/config-transform/config-transform-page'

export const Route = createFileRoute('/config-transform/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ConfigTransformPage />
}

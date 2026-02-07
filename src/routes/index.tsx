import { createFileRoute } from '@tanstack/react-router'
import { ToolGalleryPage } from '@/components/pages/gallery'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ToolGalleryPage />
}

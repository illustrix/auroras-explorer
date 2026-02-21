import { type FC, lazy, Suspense } from 'react'
import { LoadingPage } from '@/components/common/loading'

const JsonInspectorLazy = lazy(() =>
  import('./json-view').then(module => ({ default: module.JsonInspector })),
)

export const JsonInspector: FC<{ data: unknown }> = ({ data }) => {
  return (
    <Suspense fallback={<LoadingPage className="h-80" />}>
      <JsonInspectorLazy data={data} />
    </Suspense>
  )
}

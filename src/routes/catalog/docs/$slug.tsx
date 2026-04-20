import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Component,
  type ComponentType,
  type ErrorInfo,
  type ReactNode,
  Suspense,
  lazy,
  useMemo,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { MdxLayout } from '@/components/mdx/mdx-layout'
import { IconPencil } from '@tabler/icons-react'

const GITHUB_EDIT_BASE =
  'https://github.com/illustrix/auroras-explorer/edit/main/src/content/docs'

export const Route = createFileRoute('/catalog/docs/$slug')({
  component: DocPage,
})

const modules = import.meta.glob<{ default: ComponentType }>(
  '/src/content/docs/**/*.mdx',
)

function resolveDocModule(
  slug: string,
  lang: string,
): (() => Promise<{ default: ComponentType }>) | undefined {
  const primary = `/src/content/docs/${lang}/${slug}.mdx`
  const fallback = `/src/content/docs/en/${slug}.mdx`
  return modules[primary] ?? modules[fallback]
}

class MdxErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('MDX render error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <p className="text-sm text-destructive">
            Failed to render document: {this.state.error?.message}
          </p>
        </div>
      )
    }
    return this.props.children
  }
}

function DocPage() {
  const { slug } = Route.useParams()
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage?.split('-')[0] || 'en'

  const [error, setError] = useState(false)

  const Content = useMemo(() => {
    setError(false)
    const loader = resolveDocModule(slug, lang)
    if (!loader) {
      setError(true)
      return null
    }
    return lazy(() =>
      loader().catch(() => {
        setError(true)
        return { default: () => null }
      }),
    )
  }, [slug, lang])

  if (error || !Content) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="p-6 max-w-3xl mx-auto">
          <p className="text-muted-foreground">{t('docs.notFound')}</p>
          <Link
            to="/catalog/docs"
            className="text-primary hover:underline mt-2 inline-block"
          >
            ← {t('docs.backToList')}
          </Link>
        </div>
      </div>
    )
  }

  const editUrl = `${GITHUB_EDIT_BASE}/${lang}/${slug}.mdx`

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 max-w-3xl mx-auto">
      <Suspense
        fallback={
          <div className="text-muted-foreground">{t('common.loading')}</div>
        }
      >
        <MdxErrorBoundary
          fallback={
            <p className="text-destructive">{t('docs.notFound')}</p>
          }
        >
          <MdxLayout>
            <Content />
          </MdxLayout>
        </MdxErrorBoundary>
      </Suspense>
      <div className="mt-8 border-t pt-4">
        <a
          href={editUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <IconPencil className="size-4" />
          {t('docs.editOnGithub')}
        </a>
      </div>
      </div>
    </div>
  )
}

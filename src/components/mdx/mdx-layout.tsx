import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function MdxLayout({
  children,
  className,
}: { children: ReactNode; className?: string }) {
  return (
    <article
      className={cn(
        'prose dark:prose-invert prose-headings:font-serif max-w-none',
        'prose-h1:text-3xl prose-h1:border-b prose-h1:pb-3 prose-h1:mb-6',
        'prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3',
        'prose-h3:text-lg',
        'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
        'prose-code:before:content-none prose-code:after:content-none',
        'prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm',
        'prose-table:text-sm',
        'prose-th:bg-muted/50 prose-th:px-3 prose-th:py-2',
        'prose-td:px-3 prose-td:py-2',
        'prose-img:rounded-lg prose-img:shadow-md',
        'prose-blockquote:border-primary/50 prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:rounded-r-lg',
        className,
      )}
    >
      {children}
    </article>
  )
}

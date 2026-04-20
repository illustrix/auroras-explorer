import mermaid from 'mermaid'
import { useEffect, useId, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  darkMode: true,
  fontFamily: 'var(--font-sans)',
  themeVariables: {
    primaryColor: '#3b6ea5',
    primaryTextColor: '#f0f0f0',
    primaryBorderColor: '#6aacf0',
    lineColor: '#a0b4cc',
    secondaryColor: '#2d6a4f',
    tertiaryColor: '#444444',
    background: '#1e1e2e',
    mainBkg: '#3b6ea5',
    nodeBorder: '#6aacf0',
    clusterBkg: '#252545',
    clusterBorder: '#6a8cba',
    titleColor: '#f0f0f0',
    edgeLabelBackground: '#2a2a3e',
    nodeTextColor: '#f0f0f0',
  },
})

export function Mermaid({
  chart,
  className,
}: { chart: string; className?: string }) {
  const id = useId().replace(/:/g, '_')
  const containerRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState('')
  const [error, setError] = useState<string>()

  useEffect(() => {
    let cancelled = false
    const render = async () => {
      try {
        const { svg } = await mermaid.render(`mermaid-${id}`, chart.trim())
        if (!cancelled) {
          setSvg(svg)
          setError(undefined)
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Mermaid render error')
        }
      }
    }
    render()
    return () => {
      cancelled = true
    }
  }, [chart, id])

  if (error) {
    return (
      <div className="not-prose my-4 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
        Mermaid Error: {error}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'not-prose my-6 flex justify-center overflow-x-auto rounded-lg border bg-[oklch(0.22_0.02_260)] p-4',
        '[&_svg]:max-w-full',
        className,
      )}
      // biome-ignore lint: we trust mermaid's SVG output
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

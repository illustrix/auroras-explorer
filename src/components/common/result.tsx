import type { FC, ReactNode } from 'react'

export const ResultPage: FC<{
  title?: string
  description?: ReactNode
}> = ({ title, description }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center max-w-prose">
        <h1 className="text-2xl font-bold">{title}</h1>

        <div className="text-muted-foreground mt-8 whitespace-pre-wrap">
          {description}
        </div>
      </div>
    </div>
  )
}

import type { FC, ReactNode } from 'react'
import { formatSize } from '@/lib/format'
import { useDataLoadingState, useGameData } from '@/lib/store'
import { Loading } from './loading'

export const GameDataLoadingWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isLoading } = useGameData()
  const { progress, rate } = useDataLoadingState()

  if (isLoading) {
    return (
      <div className="absolute inset-0 flex flex-col gap-8 items-center justify-center text-lg font-medium">
        <Loading />
        <div>Loading Necessary Data...</div>
        <div
          className="hidden"
          // TODO: show loading progress
        >
          {progress.toFixed(2)}% @ {formatSize(rate)}/s
        </div>
      </div>
    )
  }

  return <>{children}</>
}

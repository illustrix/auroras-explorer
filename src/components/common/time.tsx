import type { ConfigType } from 'dayjs'
import dayjs from 'dayjs'
import type { FC } from 'react'
import { useForceUpdate } from 'redyc'
import { useInterval } from '@/hooks/use-interval'
import { formatTimeAdvanced } from '@/lib/format'

export const Time: FC<{ time: ConfigType }> = ({ time }) => {
  const t = dayjs(time)

  const forceUpdate = useForceUpdate()
  useInterval(forceUpdate, 60000)

  return <time dateTime={t.toISOString()}>{formatTimeAdvanced(t)}</time>
}

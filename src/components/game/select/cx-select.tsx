import type { FC } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGameData } from '@/lib/store'

interface CommodityExchangeSelectProps {
  value?: string
  onValueChange: (value: string) => void
}

export const CommodityExchangeSelect: FC<CommodityExchangeSelectProps> = ({
  value: cx,
  onValueChange: setCx,
}) => {
  const { data } = useGameData()

  return (
    <Select value={cx} onValueChange={value => setCx(value)}>
      <SelectTrigger className="w-full max-w-xs">
        <SelectValue placeholder="Select Commodity Exchange" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data?.exchanges.map(exchange => {
            return (
              <SelectItem
                key={exchange.ExchangeCode}
                value={exchange.ExchangeCode}
              >
                {exchange.ExchangeCode} ({exchange.LocationName})
              </SelectItem>
            )
          }) ?? (
            <SelectItem value="loading" disabled>
              Loading...
            </SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

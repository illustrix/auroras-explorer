import { type FC, useMemo } from 'react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getTradingSummariesByMaterial } from '@/lib/calculation'
import { useGameData } from '@/lib/store'

export const TradingSummary: FC<{ ticker: string }> = ({ ticker }) => {
  const { data } = useGameData()
  const orders = useMemo(() => {
    if (!data) return
    return getTradingSummariesByMaterial(data.orders, ticker)
  }, [data, ticker])

  if (!orders) return null

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          {orders.map(order => (
            <TableHead key={order.ExchangeCode}>{order.ExchangeCode}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Ask</TableCell>
          {orders.map(order => (
            <TableCell key={order.ExchangeCode}>
              {order.Ask?.toFixed(2)}
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>Bid</TableCell>
          {orders.map(order => (
            <TableCell key={order.ExchangeCode}>
              {order.Bid?.toFixed(2)}
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>Supply</TableCell>
          {orders.map(order => (
            <TableCell key={order.ExchangeCode}>
              {order.Supply?.toFixed(2)}
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>Demand</TableCell>
          {orders.map(order => (
            <TableCell key={order.ExchangeCode}>
              {order.Demand?.toFixed(2)}
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  )
}

export const TradingSummaryTooltip: FC<{
  ticker: string
  children: React.ReactNode
}> = ({ ticker, children }) => {
  return (
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent className="min-w-lg">
        <TradingSummary ticker={ticker} />
      </HoverCardContent>
    </HoverCard>
  )
}

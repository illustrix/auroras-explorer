import { type FC, type HTMLAttributes, memo } from 'react'
import { cn } from '@/lib/utils'
import '@/assets/css/materials.css'
import { useGameData } from '@/lib/store'
import { TradingSummaryTooltip } from './trading-summary'

export interface MaterialTileProps extends HTMLAttributes<HTMLDivElement> {
  ticker: string
  number?: number
  isBuilding?: boolean
}

const _MaterialTile: FC<MaterialTileProps> = ({
  ticker,
  number,
  isBuilding,
  className,
  ...props
}) => {
  const { data } = useGameData()
  const mat = data?.materialsByTicker?.[ticker]

  return (
    <div
      className={cn(
        'relative flex items-center justify-center material-tile size-12',
        isBuilding
          ? 'building-tile'
          : mat
            ? `material-category-${mat.CategoryName.toLowerCase().replace(/ /g, '-').replaceAll(/\(|\)/g, '')}`
            : '',
        className,
      )}
      {...props}
    >
      <div className="text-sm font-bold">{ticker}</div>

      {number != null && (
        <div className="absolute right-0 bottom-0 flex items-center justify-center text-[9px] bg-[#23282b] text-[#bbb] rounded-tl px-1 py-px">
          {number}
        </div>
      )}
    </div>
  )
}

const MaterialTileBase = memo(_MaterialTile)

export const MaterialTile: FC<MaterialTileProps> = props => {
  return (
    <TradingSummaryTooltip ticker={props.ticker}>
      <MaterialTileBase {...props} />
    </TradingSummaryTooltip>
  )
}

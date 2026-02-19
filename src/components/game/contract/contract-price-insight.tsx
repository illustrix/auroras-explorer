import { type FC, useMemo } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import type { Contract } from '@/lib/api'
import { ContractMatcher } from '@/lib/game/match-contract'
import { MaterialTile } from '../material-tile'
import { ContractType } from './components'
import { ContractDetail } from './contract-detail'

export const ContractPriceInsight: FC<{ contract: Contract }> = ({
  contract,
}) => {
  const items = useMemo(() => {
    const matcher = new ContractMatcher(contract.Conditions)
    matcher.match()
    if (!['BUYING', 'SELLING'].includes(contract.Type)) return []

    return matcher.tradings
  }, [contract])

  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <div className="flex gap-4 border-b py-2">
          <div className="text-sm text-gray-500 font-mono">
            {contract.ContractLocalId}
          </div>

          <ContractType type={contract.Type} />

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {items.map((item, index) => {
              return (
                <div
                  key={item.ticker + index.toString()}
                  className="flex items-center gap-2 w-40"
                >
                  <span className="whitespace-pre font-mono">
                    {((item.totalPrice / item.quantity) << 0)
                      .toLocaleString()
                      .padStart(6, ' ')}{' '}
                    {item.currency}
                  </span>
                  <MaterialTile ticker={item.ticker} className="h-6 w-10" />
                </div>
              )
            })}
          </div>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent asChild>
        <div className="w-full p-4 border-b bg-secondary">
          <ContractDetail contract={contract} />
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

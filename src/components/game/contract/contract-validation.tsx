import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { type FC, useMemo } from 'react'
import type { Contract } from '@/lib/api'
import { validateContract } from '@/lib/game/validate-contract'
import { groupPlansQuery } from '@/lib/query/group'
import { useGameData } from '@/lib/store'

export const ContractValidation: FC<{
  contract: Contract
}> = ({ contract }) => {
  const { data } = useGameData()
  const { groupId = '' } = useParams({
    strict: false,
  })
  const { data: plans } = useQuery(groupPlansQuery(groupId))

  const result = useMemo(() => {
    if (!data || !plans) return
    return validateContract(data, contract, plans)
  }, [data, contract, plans])

  if (!result) return null

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Validation:</span>
          <span>
            {result.matchPlan
              ? 'ok'
              : result.hasPlan
                ? 'bad'
                : result.isRequest
                  ? 'no plan'
                  : '-'}
          </span>
        </div>
      </div>
    </div>
  )
}

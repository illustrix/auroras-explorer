import { startCase } from 'es-toolkit/string'
import type { FC } from 'react'
import { MaterialSelector } from '@/components/game/material-selector'
import { CommodityExchangeSelect } from '@/components/game/select/cx-select'
import { Field, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGameData } from '@/lib/store'
import { useExplorerContext } from './context'

export const Setting: FC = () => {
  const { data } = useGameData()
  const { cx, setCx, mat, setMat, building, setBuilding } = useExplorerContext()

  return (
    <div className="flex gap-4">
      <Field className="w-60">
        <FieldLabel>Commodity Exchange</FieldLabel>
        <CommodityExchangeSelect
          value={cx}
          onValueChange={value => {
            setCx(value)
          }}
        />
      </Field>

      <Field className="w-50">
        <FieldLabel>Material</FieldLabel>
        <MaterialSelector
          materials={data?.materials || []}
          value={mat}
          onValueChange={value => {
            setMat(value)
          }}
        />
      </Field>

      <Field className="w-60">
        <FieldLabel>Building</FieldLabel>

        <Select
          value={building || ''}
          onValueChange={value => {
            setBuilding(value)
          }}
        >
          <SelectTrigger className="w-full max-w-xs">
            <SelectValue placeholder="Select Building" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {data?.buildings.map(building => {
                return (
                  <SelectItem key={building.Ticker} value={building.Ticker}>
                    {building.Ticker} ({startCase(building.Name)})
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </div>
  )
}

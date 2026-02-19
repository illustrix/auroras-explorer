import { DataTableViewOptions } from '@/components/common/data-table/column-toggle'
import { DatePickerWithRange } from '@/components/ui/date-range-picker'
import { Field, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { GroupMemberSelect } from '../group-member-select'
import { StatusMap, TypesMap } from './constants'
import { useGroupContractsPageContext } from './context'

export const Settings = () => {
  const {
    groupId,
    usernames,
    setUsernames,
    type,
    setType,
    status,
    setStatus,
    date,
    setDate,
    table,
  } = useGroupContractsPageContext()

  return (
    <div className="mb-4 flex flex-wrap gap-4 items-end">
      <DatePickerWithRange date={date} setDate={setDate} />

      <div className="flex-1" />

      <Field className="w-50">
        <FieldLabel>Users</FieldLabel>
        <GroupMemberSelect
          groupId={groupId}
          value={usernames}
          onChange={setUsernames}
        />
      </Field>

      <Field className="w-40">
        <FieldLabel>Type</FieldLabel>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select contract type" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(TypesMap).map(type => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field className="w-40">
        <FieldLabel>Status</FieldLabel>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select contract status" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(StatusMap).map(status => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <DataTableViewOptions table={table} />
    </div>
  )
}

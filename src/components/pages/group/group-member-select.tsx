import { useQuery } from '@tanstack/react-query'
import type { FC } from 'react'
import { Combobox } from '@/components/ui/custom/combobox'
import MultipleSelector from '@/components/ui/multiple-select'
import type { SelectValue } from '@/components/ui/select'
import { groupUsersQuery } from '@/lib/query/group'

export const GroupMemberSelect: FC<{
  groupId: string
  value: string[]
  onChange: (value: string[]) => void
}> = ({ groupId, value, onChange }) => {
  const { data: users } = useQuery(groupUsersQuery(groupId))
  return (
    <MultipleSelector
      className="w-full"
      defaultOptions={[]}
      options={
        users
          ?.map(user => ({
            label: user.username,
            value: user.username,
          }))
          .filter(user => user.value) || []
      }
      value={value.map(username => ({
        label: username,
        value: username,
      }))}
      onChange={values => {
        onChange(values.map(v => v.value))
      }}
      placeholder="Select User"
      inputProps={{
        className: 'w-full',
      }}
      emptyIndicator="No users found"
    />
  )
}

export interface GroupMemberSelectSingleProps
  extends Omit<React.ComponentProps<typeof SelectValue>, 'value' | 'onChange'> {
  groupId: string
  value: string
  onChange: (value: string) => void
}

export const GroupMemberSelectSingle: FC<GroupMemberSelectSingleProps> = ({
  groupId,
  value,
  onChange,
}) => {
  const { data: users } = useQuery(groupUsersQuery(groupId))

  return (
    <Combobox
      options={
        users
          ?.filter(user => user.username)
          .map(user => {
            return {
              label: user.username,
              value: user.username,
            }
          }) || []
      }
      value={value}
      onChange={onChange}
      placeholder="Select User"
      emptyText="No users found"
    />
  )
}

import { useQuery } from '@tanstack/react-query'
import type { FC } from 'react'
import MultipleSelector from '@/components/ui/multiple-select'
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

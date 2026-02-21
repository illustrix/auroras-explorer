import { Check, ChevronsUpDown } from 'lucide-react'
import { type FC, forwardRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export interface Option {
  label: string
  value: string
}

export type GroupedOption =
  | Option
  | {
      value: string
      items: Option[]
    }

export interface ComboboxProps {
  options: GroupedOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  emptyText?: string
}

export const Combobox: FC<ComboboxProps> = ({
  options,
  value,
  onChange,
  placeholder,
  emptyText = 'No options found.',
}) => {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label={placeholder}
          className="justify-between"
        >
          {value ? value : placeholder}
          <ChevronsUpDown className="text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0">
        <Command
          loop
          filter={(value, search, keywords) => {
            if (value === search) return 1
            if (value.toLowerCase() === search.toLowerCase()) return 0.95
            if (value.toLowerCase().startsWith(search.toLowerCase())) return 0.9
            if (value.toLowerCase().includes(search.toLowerCase())) return 0.7
            if (
              keywords?.some(keyword =>
                keyword.toLowerCase().includes(search.toLowerCase()),
              )
            )
              return 0.5
            return 0
          }}
        >
          <CommandList className="h-(--cmdk-list-height) max-h-100">
            <CommandInput placeholder="Search Materials..." />
            <CommandEmpty>{emptyText}</CommandEmpty>
            {options.map(option => {
              if ('items' in option) {
                return (
                  <CommandGroup key={option.value} heading={option.value}>
                    {option.items?.map(material => (
                      <ComboboxItem
                        key={material.value}
                        value={material.value}
                        label={material.label}
                        isSelected={value === material.value}
                        onSelect={() => {
                          onChange(material.value)
                          setOpen(false)
                        }}
                      />
                    ))}
                  </CommandGroup>
                )
              }

              return (
                <ComboboxItem
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  isSelected={value === option.value}
                  onSelect={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                />
              )
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export interface ComboboxItemProps {
  value: string
  label: string
  isSelected: boolean
  onSelect: () => void
}

export const ComboboxItem = forwardRef<HTMLDivElement, ComboboxItemProps>(
  function ComboboxItem({ value, label, isSelected, onSelect }, ref) {
    return (
      <CommandItem
        key={value}
        onSelect={onSelect}
        ref={ref}
        className="data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground"
        value={value}
      >
        {label}

        <Check
          className={cn('ml-auto', isSelected ? 'opacity-100' : 'opacity-0')}
        />
      </CommandItem>
    )
  },
)

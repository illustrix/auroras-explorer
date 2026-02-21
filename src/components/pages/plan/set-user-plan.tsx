import { revalidateLogic, useForm, useStore } from '@tanstack/react-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { type FC, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { apiClient } from '@/lib/api'
import { getPlanIdFromLink } from '@/lib/planner/util'
import { sharedPlanQuery } from '@/lib/query/plan'
import { GroupMemberSelectSingle } from '../group/group-member-select'

export const SetUserPlanDialog: FC<{
  groupId: string
}> = ({ groupId }) => {
  const [open, setOpen] = useState(false)

  const setUserPlan = useMutation({
    mutationKey: ['set-user-planet-plan', groupId],
    mutationFn: async ({
      username,
      plan,
    }: {
      username: string
      plan: string
    }) => {
      if (!username) {
        form.setFieldMeta('username', old => ({
          ...old,
          errors: ['Username is required'],
        }))
        throw new Error('Username is required')
      }
      const planId = getPlanIdFromLink(plan)
      if (!planId) {
        form.setFieldMeta('plan', old => ({
          ...old,
          errors: ['Invalid plan link'],
        }))
        throw new Error('Username is required')
      }

      const res = await apiClient.post(`/api/group/${groupId}/plan`, {
        username: username.toUpperCase(),
        plan: planId,
        planet: planInfo.data?.baseplanner.planet_id,
        groupId,
      })

      if (res.status !== 200) {
        throw new Error(res.data.message)
      }

      return res.data
    },
    onSuccess: () => {
      setOpen(false)
      form.reset()
    },
  })

  const form = useForm({
    defaultValues: {
      username: '',
      plan: '',
    },
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: ({ value }) => {
        if (!value.username) {
          return {
            username: 'Username is required',
          }
        }
        if (!value.plan) {
          return {
            plan: 'Plan link is required',
          }
        }
      },
    },
    onSubmit: ({ value }) => {
      setUserPlan.mutate(value)
    },
  })

  const planLink = useStore(form.store, state => state.values.plan)
  const planId = getPlanIdFromLink(planLink)
  const planInfo = useQuery(sharedPlanQuery(planId))

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Set User Plan</Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={e => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <DialogHeader>
            <DialogTitle>Set User Plan on Planet</DialogTitle>
            <DialogDescription>
              Setup user base plan on planet to view contracts and production
              overview.
            </DialogDescription>
          </DialogHeader>

          {setUserPlan.error && (
            <div className="mt-4 text-destructive">
              {setUserPlan.error instanceof Error
                ? setUserPlan.error.message
                : 'An error occurred'}
            </div>
          )}

          <FieldSet className="mt-4">
            <FieldGroup>
              <form.Field name="username">
                {field => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>User</FieldLabel>

                      <GroupMemberSelectSingle
                        groupId={groupId}
                        id={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={field.handleChange}
                        aria-invalid={isInvalid}
                        placeholder="Select User"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              </form.Field>

              <form.Field name="plan">
                {field => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Plan Link</FieldLabel>
                      <Input
                        id={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={e => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        type="url"
                        placeholder="https://prunplanner.org/shared/xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              </form.Field>
            </FieldGroup>
          </FieldSet>

          {planInfo.data ? (
            <div className="mt-4 p-4 border rounded">
              <div className="mb-2 text-sm text-muted-foreground">
                Plan Info
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-2 items-center">
                  <div className="text-sm font-medium">Name</div>
                  <div className="text-sm text-muted-foreground">
                    {planInfo.data.baseplanner.name}
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="text-sm font-medium">Planet ID</div>
                  <div className="text-sm text-muted-foreground">
                    {planInfo.data.baseplanner.planet_id}
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="text-sm font-medium">Buildings</div>
                  <div className="flex gap-1 text-sm text-muted-foreground">
                    {planInfo.data.baseplanner.baseplanner_data.buildings.map(
                      i => {
                        return (
                          <span key={i.name} className="">
                            {i.name} *{i.amount}
                          </span>
                        )
                      },
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : planInfo.isFetching ? (
            <div className="mt-4 flex items-center gap-2">
              <Spinner />
              Fetching plan info...
            </div>
          ) : planId ? (
            <div className="mt-4 text-destructive">
              Failed to fetch plan info. Please check the plan link.
            </div>
          ) : null}

          <DialogFooter className="mt-8">
            <DialogClose asChild>
              <Button variant="outline" disabled={setUserPlan.isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={setUserPlan.isPending}>
              {setUserPlan.isPending ? (
                <Spinner data-icon="inline-start" />
              ) : null}
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

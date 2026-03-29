import { useMutation } from '@tanstack/react-query'
import { type FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { setItem } from '@/hooks/use-storage'
import { apiClient } from '@/lib/api'
import { queryClient } from '@/lib/query'
import { cn } from '@/lib/utils'
import { AppError } from '@/server/common/error'

export interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export const LoginForm: FC<LoginFormProps> = ({ className, ...props }) => {
  const [token, setToken] = useState('')
  const { t } = useTranslation()

  const exchangeTokenMutation = useMutation({
    mutationFn: async (fioToken: string) => {
      const res = await apiClient.post('/api/token/exchange', {
        fioToken,
      })
      return res.data.token as string
    },
    onSuccess: token => {
      setItem('token', token)
      queryClient.clear()
    },
  })

  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center',
        className,
      )}
      {...props}
    >
      <Card className="min-w-md">
        <CardHeader>
          <CardTitle>{t('login.title')}</CardTitle>
          <CardDescription>
            {t('login.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={e => {
              e.preventDefault()
              exchangeTokenMutation.mutate(token)
            }}
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="fioToken">{t('login.fioToken')}</FieldLabel>
                <Input
                  id="fioToken"
                  type="text"
                  placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                  required
                  value={token}
                  onChange={e => setToken(e.target.value)}
                />
                {exchangeTokenMutation.error && (
                  <FieldDescription className="text-destructive">
                    {exchangeTokenMutation.error instanceof AppError ? (
                      exchangeTokenMutation.error.message
                    ) : (
                      <p>{t('login.networkError')}</p>
                    )}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                {exchangeTokenMutation.isPending ? (
                  <Button type="submit">
                    <Spinner data-icon="inline-start" />
                    {t('login.loading')}
                  </Button>
                ) : (
                  <Button type="submit">{t('login.button')}</Button>
                )}
                <FieldDescription className="text-center">
                  {t('login.privacy')}
                  <br />
                  <a
                    href="https://fio.fnar.net/settings"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('login.getToken')}
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

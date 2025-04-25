import { Card } from '@/components/ui/card'
import AuthLayout from '../auth-layout'
import { UserAuthForm } from './components/user-auth-form'
import { useEffect } from 'react'
import { router } from '@/main'
import { useSessionQuery } from '@/hooks/use-session-query'

export default function SignIn() {

  const { isFetching, isAuthenticated } = useSessionQuery()
  useEffect(() => {
    if (isAuthenticated) {
      router.navigate({
        to: '/polls',
      })
    }
  }, [isAuthenticated])
  if (isFetching) {
    return (<>Authenticating</>)
  }

  if (isAuthenticated) {
    return (<>Authenticated</>)
  }
  return (
    <AuthLayout>
      <Card className='p-6'>
        <div className='flex flex-col space-y-2 text-left'>
          <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
          <p className='text-sm text-muted-foreground'>
            Enter your Member ID and password below <br />
            to log into your account
          </p>
        </div>
        <UserAuthForm />
      </Card>
    </AuthLayout>
  )
}

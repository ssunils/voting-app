import Cookies from 'js-cookie'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { SearchProvider } from '@/context/search-context'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { useSessionQuery } from '@/hooks/use-session-query'
import SignIn from '@/features/auth/sign-in'
import { useEffect } from 'react'
import { router } from '@/main'

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
})

function RouteComponent() {
  const defaultOpen = Cookies.get('sidebar:state') !== 'false'

  const { data, isFetching, isAuthenticated } = useSessionQuery()
  useEffect(() => {
    console.log(data)
    if (isAuthenticated) {
      if (data?.role === 'admin') {
        router.navigate({
          to: '/',
        })
      }
      if (data?.role === 'member') {
        router.navigate({
          to: '/vote',
        })
      }

    }
  }, [isAuthenticated])
  if (isFetching) {
    return (<>Authenticating</>)
  }
  return (
    <>
      {isAuthenticated &&
        <SearchProvider>
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <div
              id='content'
              className={cn(
                'ml-auto w-full max-w-full',
                'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
                'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
                'transition-[width] duration-200 ease-linear',
                'flex h-svh flex-col',
                'group-data-[scroll-locked=1]/body:h-full',
                'group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh'
              )}
            >
              <Outlet />
            </div>
          </SidebarProvider>
        </SearchProvider>
      }
      {!isAuthenticated && <SignIn />}
    </>
  )
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Main } from '@/components/layout/main'
import { Overview } from './components/overview'
import { RecentVotes } from './components/recent-votes'
import { Users, Vote } from 'lucide-react'
import { IconAccessPoint } from '@tabler/icons-react'
import { useDashboardStats } from '@/hooks/dashboard/use-dashboard-stats'
import { useSessionQuery } from '@/hooks/use-session-query'
import { useGetLatestVotes } from '@/hooks/dashboard/use-get-latest-votes'

export default function Dashboard() {
  const { isAuthenticated } = useSessionQuery()
  const { data, isLoading, error } = useDashboardStats();
  const { data: latestVotes } = useGetLatestVotes()

  if (isLoading) return <div>Loading stats...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
    
      {isAuthenticated &&
        <Main>
          {isAuthenticated.toString()}
          <div className='mb-2 flex items-center justify-between space-y-2'>
            <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
          </div>
          <div className='grid gap-4 mb-4 sm:grid-cols-2 lg:grid-cols-4'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Total Menbers
                </CardTitle>
                <Users />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{data?.total_members}</div>
                <p className='text-xs text-muted-foreground'>
                  Total Registered users in the system
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Users Online
                </CardTitle>
                <IconAccessPoint />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{data?.users_online}</div>
                <p className='text-xs text-muted-foreground'>
                  Logged in users in the system
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Pending Polls</CardTitle>
                <Vote />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{data?.pending_polls}</div>
                <p className='text-xs text-muted-foreground'>
                  No. of polls in pending state
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Completed Polls
                </CardTitle>
                <Vote />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{data?.completed_polls}</div>
                <p className='text-xs text-muted-foreground'>
                  No. of polls in completed state
                </p>
              </CardContent>
            </Card>
          </div>
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
            <Card className='col-span-1 lg:col-span-4'>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className='pl-2'>
                <Overview />
              </CardContent>
            </Card>
            <Card className='col-span-1 lg:col-span-3'>
              <CardHeader>
                <CardTitle>Recent Votes</CardTitle>
                <CardDescription>
                  Total of {latestVotes?.total} votes registered
                </CardDescription>
              </CardHeader>
              <CardContent>
                {latestVotes && <RecentVotes data={latestVotes} />}
                
              </CardContent>
            </Card>
          </div>
        </Main>
      }
    </>
  )
}

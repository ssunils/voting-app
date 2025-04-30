import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { TasksDialogs } from './components/tasks-dialogs'
import { TasksPrimaryButtons } from './components/tasks-primary-buttons'
import TasksProvider from './context/tasks-context'
import { useGetPollsList } from '@/hooks/polls/use-get-polls-list'

export default function Polls() {
  const { data, isLoading } = useGetPollsList()
  { isLoading && <p className='text-muted-foreground'>Loading...</p> }

  return (
    <TasksProvider>
      <Header fixed>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between gap-x-4 space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Polls</h2>
            <p className='text-muted-foreground'>
              Create and manage your polls here.
            </p>
          </div>
          <TasksPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          {data && data?.data &&
            <DataTable data={data.data} columns={columns} />
          }
        </div>
      </Main>

      <TasksDialogs />
    </TasksProvider>
  )
}

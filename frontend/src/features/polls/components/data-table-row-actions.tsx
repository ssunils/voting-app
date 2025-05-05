import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { IconTrash } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTasks } from '../context/tasks-context'
import { taskSchema } from '../data/schema'
import { Edit, Play, StopCircle } from 'lucide-react'
import { useActivatePoll, useDeActivatePoll } from '@/hooks/polls/use-manage-poll'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from '@/hooks/use-toast'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const queryClient = useQueryClient()

  const task = taskSchema.parse(row.original)

  const { mutate: activatePoll } = useActivatePoll()
  const { mutate: deActivatePoll } = useDeActivatePoll()
  const { setOpen, setCurrentRow } = useTasks()

  const enablePoll = () => {
    activatePoll(
      { poll_id: task.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['pollsList'] })
        },
        onError: (err: any) => {
          toast({
            title: 'Something went wrong',
            description: err?.response?.data?.message || 'An unexpected error occurred',
            variant: 'destructive',
          })
        }
      }
    )
  }

  const disablePoll = () => {
    deActivatePoll(
      { poll_id: task.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['pollsList'] })
        },
        onError: (err: any) => {
          toast({
            title: 'Something went wrong',
            description: err?.response?.data?.message || 'An unexpected error occurred',
            variant: 'destructive',
          })
        }
      }
    )
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        {task.active.toString() === '1' && (
          <>
            <DropdownMenuItem
              className='cursor-pointer'
              onClick={disablePoll}
            >
              <StopCircle className='text-red-500' />
              End Poll
            </DropdownMenuItem>
          </>
        )

        }
        {task.active.toString() === '0' &&
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={enablePoll}
          >
            <Play className='text-green-500' />
            Activate Poll
          </DropdownMenuItem>
        }
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => {
            setCurrentRow(task)
            setOpen('update')
          }}
        >
          <Edit className=' text-blue-500' />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => {
            setCurrentRow(task)
            setOpen('delete')
          }}
        >
          Delete
          <DropdownMenuShortcut>
            <IconTrash size={16} className='text-red-600' />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

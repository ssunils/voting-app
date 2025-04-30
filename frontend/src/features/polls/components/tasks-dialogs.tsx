import { toast } from '@/hooks/use-toast'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useTasks } from '../context/tasks-context'
import { TasksMutateDrawer } from './tasks-mutate-drawer'
import { useDeletePoll } from '@/hooks/polls/use-manage-poll'
import { useQueryClient } from '@tanstack/react-query'

export function TasksDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useTasks()
  const { mutate: deletePoll } = useDeletePoll()
  const queryClient = useQueryClient()

  const deleteAction = () => {
    deletePoll({ id: currentRow?.id }, {
      onSuccess: () => {
        toast({
          title: 'Poll updated successfully',
        })
        setOpen(null)
        setCurrentRow(null)
        queryClient.invalidateQueries({ queryKey: ['pollsList'] })
      },
      onError: () => {
        toast({
          title: 'Something went wrong',
          description: 'Could not update the poll. Try again later.',
          variant: 'destructive',
        })
      },
    })
  }
  return (
    <>
      <TasksMutateDrawer
        key='task-create'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      {currentRow && (
        <>
          <TasksMutateDrawer
            key={`task-update`}
            open={open === 'update'}
            onOpenChange={() => {
              setOpen('update')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ConfirmDialog
            key='task-delete'
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            handleConfirm={deleteAction}
            className='max-w-md'
            title={`Delete this poll ?`}
            desc={
              <>
                You are about to delete <strong>{currentRow.title}</strong><br/>
                This action cannot be undone.
              </>
            }
            confirmText='Delete'
          />
        </>
      )}
    </>
  )
}

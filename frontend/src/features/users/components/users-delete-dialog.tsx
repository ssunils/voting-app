'use client'

import { IconAlertTriangle } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from '@/hooks/use-toast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { User } from '../data/schema'
import { useDeleteMember } from '@/hooks/members/use-delete-member'
import { useEffect } from 'react'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: User
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const { mutate: deleteMember, isSuccess: deleteSuccess } = useDeleteMember()
  const queryClient = useQueryClient()

  const handleDelete = async () => {

    deleteMember(currentRow.id)

  }

  useEffect(() => {
    if (deleteSuccess) {
      onOpenChange(false)
      toast({
        title: 'User deleted',
        description: (
          <p>
            User <span className='font-bold'>{currentRow.name}</span> has been
            deleted.
          </p>
        ),
      })
      queryClient.invalidateQueries({ queryKey: ['userList'] })

    }
  }, [deleteSuccess, currentRow.name])

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      title={
        <span className='text-destructive'>
          <IconAlertTriangle
            className='mr-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          Delete User
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to delete{' '}
            <span className='font-bold'>{currentRow.username}</span>?
            <br />
            This action will permanently remove the user {' '}
            <span className='font-bold'>
              {currentRow.name.toUpperCase()}
            </span>{' '}
            from the system. This cannot be undone.
          </p>

          <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be carefull, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText='Delete'
      destructive
    />
  )
}

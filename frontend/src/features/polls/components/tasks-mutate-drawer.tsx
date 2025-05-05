import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Task } from '../data/schema'
import { Textarea } from '@/components/ui/textarea'
import { useCreatePoll, useUpdatePoll } from '@/hooks/polls/use-manage-poll'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Task
}

const formSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string(),
})
type TasksForm = z.infer<typeof formSchema>

export function TasksMutateDrawer({ open, onOpenChange, currentRow }: Props) {
  
  const queryClient = useQueryClient()
  const isUpdate = !!currentRow
  const { mutate: createPoll } = useCreatePoll()
  const { mutate: updatePoll } = useUpdatePoll()

  const form = useForm<TasksForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow,
  })

  const onSubmit = (data: TasksForm) => {
    if(isUpdate) {
      updatePoll({ ...data, id: currentRow?.id }, {
        onSuccess: () => {
          toast({
            title: 'Poll updated successfully',
          })
          onOpenChange(false)
          form.reset()
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
      return
    }
    createPoll(data, {
      onSuccess: () => {
        toast({
          title: 'Poll created successfully',
        })
        onOpenChange(false)
        form.reset()
        queryClient.invalidateQueries({ queryKey: ['pollsList'] })
      },
      onError: () => {
        toast({
          title: 'Something went wrong',
          description: 'Could not create the poll. Try again later.',
          variant: 'destructive',
        })
      },
    })
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        form.reset()
      }}
    >
      <SheetContent className='flex flex-col'>
        <SheetHeader className='text-left'>
          <SheetTitle>{isUpdate ? 'Update' : 'Create'} Poll</SheetTitle>
          <SheetDescription>
            {isUpdate
              ? 'Update the poll by providing necessary info.'
              : 'Add a new poll by providing necessary info.'}
            Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id='tasks-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex-1 space-y-5'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder='Enter subject in English' rows={2} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder='Add description here' rows={10} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <SheetFooter className='gap-2'>
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
          <Button form='tasks-form' type='submit'>
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

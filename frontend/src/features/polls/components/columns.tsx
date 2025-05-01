import { ColumnDef } from '@tanstack/react-table'
import { statuses } from '../data/data'
import { Task } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { Badge } from '@/components/ui/badge'
import { FormattedDate } from '@/lib/FormattedDate'

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ row }) => <div className='w-[20px]'>{row.original.id}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Title' />
    ),
    cell: ({ row }) => {

      return (
        <div className=''>
          <span className='truncate font-medium d-block'>
            {row.getValue('title')}
          </span>
          <p>{row.original.description}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'active',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value.toString() === row.getValue('active')?.toString()
      )
      console.log('status', status)
      if (!status) {
        return null
      }

      return (
        <div className='flex w-[100px] items-center'>
          <span className='flex items-center gap-2'>
            <Badge variant={status.value === '1' ? 'default' : 'secondary'}>
              <status.icon size={12} className='mr-2' /> {status.label}
            </Badge>
          </span>

        </div >
      )
    },
  },
  {
    accessorKey: 'start_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Start Date' />
    ),
    cell: ({ row }) => {

      return (
        <div className='flex items-center'>
          <span>{<FormattedDate value={row.getValue('start_date')} />}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'end_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='End Date' />
    ),
    cell: ({ row }) => {

      return (
        <div className='flex items-center'>
          <span>{<FormattedDate value={row.getValue('end_date')} />}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'vote_ratio',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Vote Ratio (%)' />
    ),
    cell: ({ row }) => {

      return (
        <div className='flex items-center'>
          <span>Yes: {row.original.yes_votes} 
            <span className='fill-grey-900'> |</span>
             No: {row.original.no_votes}</span>
        </div>
      )
    },
  },

  {
    accessorKey: 'result',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Result' />
    ),
    cell: ({ row }) => {


      return (
        <div className='flex items-center'>
          <Badge variant={`${row.getValue('result') === 'Accepted' ? 'default' : 'outline'}`}>{row.getValue('result')}</Badge>
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]

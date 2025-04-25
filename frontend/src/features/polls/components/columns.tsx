import { ColumnDef } from '@tanstack/react-table'
import { statuses } from '../data/data'
import { Task } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { Badge } from '@/components/ui/badge'

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ row }) => <div className='w-[20px]'>{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'subject',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Subject' />
    ),
    cell: ({ row }) => {

      return (
        <div className='flex space-x-2'>
          <span className='truncate font-medium'>
            {row.getValue('subject')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status')
      )

      if (!status) {
        return null
      }

      return (
        <div className='flex w-[100px] items-center'>
          <span>{status.label}</span>
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
          <span>{row.getValue('vote_ratio')}</span>
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

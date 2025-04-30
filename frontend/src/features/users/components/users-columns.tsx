import { ColumnDef } from '@tanstack/react-table'
import LongText from '@/components/long-text'
import { User } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<User>[] = [

  {
    accessorKey: 'member_id',
    id: 'member_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Member ID' />
    ),
    cell: ({ row }) => {
      return <LongText className='max-w-50'>{row.getValue('member_id')}</LongText>
    },
    meta: { className: 'w-50' },
  },
  {
    accessorKey: 'name',
    id: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      return <LongText className='max-w-100'>{row.getValue('name')}</LongText>
    },
    meta: { className: 'w-100' },
  },
  {
    accessorKey: 'username',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Username' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('username')}</LongText>
    ),
    enableHiding: false,
  },

  {
    accessorKey: 'password',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Password' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('password')}</LongText>
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Phone Number' />
    ),
    cell: ({ row }) => <div>{row.getValue('phone')}</div>,
    enableSorting: false,
  },
  // {
  //   accessorKey: 'status',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Status' />
  //   ),
  //   cell: ({ row }) => {
  //     const { status } = row.original
  //     const badgeColor = callTypes.get(status as 'active' | 'suspended')
  //     return (
  //       <div className='flex space-x-2'>
  //         <Badge variant='outline' className={cn('capitalize', badgeColor)}>
  //           {row.getValue('status')}
  //         </Badge>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  //   enableHiding: false,
  //   enableSorting: false,
  // },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]

import {  CheckIcon, X } from 'lucide-react'

export function RecentSales() {
  return (
    <div className='space-y-2'>
      <div className='flex items-center gap-4'>
        <div className='h-9 w-9'>
          <X className=' text-red-500' />
        </div>
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm font-medium leading-none'>Olivia Martin</p>
            <p className='text-sm text-muted-foreground'>
              Do you approve the minutes of the previous AGM?
            </p>
            <small className='text-gray-400'>2025, 12 June 10:22:34</small>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-4 border-t border-t-slate-200 pt-4'>
        <div className='h-9 w-9'>
          <X className=' text-red-500' />
        </div>
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm font-medium leading-none'>Jackson Lee</p>
            <p className='text-sm text-muted-foreground'>
              Do you accept the church's annual financial report for the year?
            </p>
            <small className='text-gray-400'>2025, 12 June 10:22:12</small>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-4 border-t border-t-slate-200 pt-4'>
        <div className='h-9 w-9'>
          <X className=' text-red-500' />
        </div>
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm font-medium leading-none'>Isabella Nguyen</p>
            <p className='text-sm text-muted-foreground'>
              Do you accept the church’s primary focus for the upcoming year?
            </p>
            <small className='text-gray-400'>2025, 12 June 10:21:02</small>
          </div>
        </div>
      </div>

      <div className='flex items-center gap-4 border-t border-t-slate-200 pt-4'>
        <div className='h-9 w-9'>
          <X className=' text-red-500' />
        </div>
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm font-medium leading-none'>William Kim</p>
            <p className='text-sm text-muted-foreground'>Do you accept the annual financial report for the year?</p>
            <small className='text-gray-400'>2025, 12 June 10:20:22</small>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-4 border-t border-t-slate-200 pt-4'>
        <div className='h-9 w-9'>
          <CheckIcon className=' text-green-500' />
        </div>
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm font-medium leading-none'>Sofia Davis</p>
            <p className='text-sm text-muted-foreground'>
              Do you accept the church's annual financial report for the year?
            </p>
            <small className='text-gray-400'>2025, 12 June 10:20:21</small>
          </div>
        </div>
      </div>
    </div>
  )
}

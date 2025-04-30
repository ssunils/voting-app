import { LatestVotesResponse } from '@/hooks/dashboard/use-get-latest-votes'
import { FormattedDate } from '@/lib/FormattedDate'
import { CheckIcon, X } from 'lucide-react'

export function RecentVotes(props: {data: LatestVotesResponse}) {

  return (
    <>
      <div className='space-y-2'>
        {props.data?.votes.map((vote) => (
          <div className='flex items-center gap-2 border-b border-b-muted p-1 ' key={vote.created_at}>
            <div className='h-9 w-9'>
              {vote.vote_choice === 'yes' ? (
                <CheckIcon className='h-9 w-9 text-green-500' />
              ) : (
                <X className='h-9 w-9 text-red-500' />
              )}
            </div>
            <div className='flex flex-1 flex-wrap items-center justify-between'>
              <div className='space-y-1'>
                <p className='text-sm font-medium leading-none'>{vote.member_name}</p>
                <p className='text-sm text-muted-foreground'>
                  {vote.poll_title}
                </p>
                <small className='text-gray-400'>
                  <FormattedDate value={vote.created_at} />
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
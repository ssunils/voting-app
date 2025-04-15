import { createLazyFileRoute } from '@tanstack/react-router'
import Polls from '@/features/polls'

export const Route = createLazyFileRoute('/_authenticated/polls/')({
  component: Polls,
})

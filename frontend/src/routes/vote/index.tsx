import Voting from '@/features/voting'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/vote/')({
  component: Voting,
})
import PublicVoting from '@/features/public-voting'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/vote/')({
  component: PublicVoting,
})
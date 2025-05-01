import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.any(),
  title: z.any(),
  description: z.any(),
  active: z.any(),
  yes_votes: z.any(),
  no_votes: z.any(),
})

export type Task = z.infer<typeof taskSchema>

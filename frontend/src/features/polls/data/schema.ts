import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  active: z.number().int().min(0).max(1),
  yes_votes: z.string(),
  no_votes: z.string(),
})

export type Task = z.infer<typeof taskSchema>

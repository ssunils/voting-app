import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  subject: z.string(),
  status: z.string(),
  label: z.string(),
  vote_ratio: z.string(),
  result: z.string(),
})

export type Task = z.infer<typeof taskSchema>

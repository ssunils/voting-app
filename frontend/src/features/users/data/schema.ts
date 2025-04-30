import { z } from 'zod'

const userStatusSchema = z.union([
  z.literal('active'),
  z.literal('suspended'),
])
export type UserStatus = z.infer<typeof userStatusSchema>

// const userRoleSchema = z.union([
//   z.literal('voter'),
//   z.literal('admin'),
//   z.literal('teller'),
// ])

// const userSchema = z.object({
//   id: z.string(),
//   name: z.string(),
//   member_id: z.string(),
//   username: z.string(),
//   password: z.string(),
//   phone: userStatusSchema,
//   email: z.string(),
// })
// export type User = z.infer<typeof userSchema>

// export const userListSchema = z.array(userSchema)

export interface User {
  id: string
  email: string
  member_id: string
  name: string
  password: string
  phone: string
  status: string
  username: string
}
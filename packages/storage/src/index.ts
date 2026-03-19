import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
})

export type User = z.infer<typeof userSchema>

export function findUserById(id: string): User {
  return { id, name: 'Test User', email: 'test@test.com' }
}

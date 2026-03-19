import { z } from 'zod'
import { greet } from '@test/utils'

export const userSchema = z.object({ id: z.string(), name: z.string() })
export type User = z.infer<typeof userSchema>

export function findUserById(id: string): User {
  return { id, name: greet(id) }
}

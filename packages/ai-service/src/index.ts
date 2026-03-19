import { findUserById } from '@test/storage'
import { greet } from '@test/utils'

export function generateGreeting(userId: string): string {
  const user = findUserById(userId)
  return greet(user.name)
}

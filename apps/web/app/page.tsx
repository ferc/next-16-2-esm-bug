import { cookies } from 'next/headers'
import { greet } from '@test/utils'
import { findUserById } from '@test/storage'
import { generateGreeting } from '@test/ai-service'
import { cn } from '@test/ui'

export default async function Home() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')?.value ?? 'light'
  const greeting = greet('world')
  const user = findUserById('test')
  const aiGreeting = generateGreeting('test')
  const className = cn('text-red-500')

  return (
    <div className={className}>
      <h1>{greeting} (theme: {theme})</h1>
      <p>{user.name} - {aiGreeting}</p>
      <p>Last updated: March 2026</p>
    </div>
  )
}

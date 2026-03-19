import { findUserById } from '@test/storage'
import { generateGreeting } from '@test/ai-service'
import { cn } from '@test/ui'
import { greet } from '@test/utils'

// Force dynamic rendering (like the actual monorepo's force-dynamic)
export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const user = findUserById('server-side')
  const greeting = generateGreeting('server')
  const hello = greet('world')
  const className = cn('text-red-500', 'font-bold')

  return (
    <div className={className}>
      <h1>{greeting}</h1>
      <p>{hello}</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}

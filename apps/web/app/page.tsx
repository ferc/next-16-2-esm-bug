import { cookies } from 'next/headers'
import { greet } from '@test/utils'

export default async function Home() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')?.value ?? 'light'
  const greeting = greet('world')

  return (
    <div>
      <h1>{greeting} (theme: {theme})</h1>
    </div>
  )
}

import { cookies } from 'next/headers'
import { greet } from '@test/utils'

export default async function Home() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')?.value ?? 'light'
  return <h1>{greet('world')} (theme: {theme})</h1>
}

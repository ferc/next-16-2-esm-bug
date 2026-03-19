import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { greet } from '@test/utils'
import { findUserById } from '@test/storage'
import { generateGreeting } from '@test/ai-service'

async function loginAction() {
  'use server'
  redirect('/')
}

export default async function LoginPage() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')?.value ?? 'light'
  const greeting = greet('world')
  const user = findUserById('test')
  const aiGreeting = generateGreeting('test')

  return (
    <form action={loginAction}>
      <h1>Login (theme: {theme})</h1>
      <p>{greeting} - {user.name} - {aiGreeting}</p>
      <button type="submit">Sign In</button>
    </form>
  )
}

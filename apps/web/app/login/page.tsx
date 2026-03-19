import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { greet } from '@test/utils'

async function loginAction() {
  'use server'
  redirect('/')
}

export default async function LoginPage() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')?.value ?? 'light'

  return (
    <form action={loginAction}>
      <h1>{greet('login')} (theme: {theme})</h1>
      <button type="submit">Sign In</button>
    </form>
  )
}

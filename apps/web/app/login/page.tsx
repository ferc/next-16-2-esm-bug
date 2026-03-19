import { cookies } from 'next/headers'

async function testAction() {
  'use server'
  console.log('server action executed')
}

export default async function LoginPage() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')?.value ?? 'light'

  return (
    <form action={testAction}>
      <h1>Login (theme: {theme})</h1>
      <button type="submit">Test Server Action</button>
    </form>
  )
}

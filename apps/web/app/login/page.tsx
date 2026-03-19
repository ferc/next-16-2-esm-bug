import { redirect } from 'next/navigation'

async function loginAction() {
  'use server'
  redirect('/api/auth/test')
}

export default function LoginPage() {
  return (
    <form action={loginAction}>
      <h1>Login</h1>
      <button type="submit">Sign In</button>
    </form>
  )
}

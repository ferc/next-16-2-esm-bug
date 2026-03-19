import { redirect } from 'next/navigation'

async function loginAction() {
  'use server'
  redirect('/api/auth/test')
}

export default function LoginPage() {
  return (
    <div>
      <h1>Login Page</h1>
      <form action={loginAction}>
        <button type="submit">Sign In (server action)</button>
      </form>
      <p>Test endpoints:</p>
      <ul>
        <li><a href="/api/auth/test">API Auth Test</a></li>
        <li><a href="/api/heavy">API Heavy</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
      </ul>
    </div>
  )
}

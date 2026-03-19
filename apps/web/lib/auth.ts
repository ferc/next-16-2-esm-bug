import NextAuth from 'next-auth'

const result = NextAuth({
  providers: [],
  secret: 'dummy-secret-for-testing-only',
})

export const { auth, handlers, signIn, signOut } = result

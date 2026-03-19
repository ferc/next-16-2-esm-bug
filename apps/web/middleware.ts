import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import type { NextAuthRequest } from 'next-auth'
import { auth } from './lib/auth'

function authCallback(req: NextAuthRequest): Response | undefined {
  if (!req.auth) {
    if (req.nextUrl.pathname.startsWith('/api/')) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return Response.redirect(new URL('/login', req.nextUrl.origin))
  }
}

const authMiddleware = auth(authCallback)

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  return authMiddleware(req, { params: Promise.resolve({}) })
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|login).*)',
  ],
}

import { NextResponse } from 'next/server'
import { greet } from '@test/utils'
import { findUserById } from '@test/storage'
import { cn } from '@test/ui'
import { auth } from '../../../../lib/auth'
import superjson from 'superjson'
import { z } from 'zod'

const schema = z.object({ name: z.string() })

export async function GET() {
  const session = await auth()
  const greeting = greet('world')
  const user = findUserById('test-id')
  const className = cn('text-red-500', 'font-bold')
  const serialized = superjson.stringify({ greeting, session, user })
  const parsed = schema.safeParse({ name: 'test' })
  return NextResponse.json({ message: greeting, user, className, parsed: parsed.success })
}

export async function POST() {
  const session = await auth()
  return NextResponse.json({ message: 'Auth POST works', session })
}

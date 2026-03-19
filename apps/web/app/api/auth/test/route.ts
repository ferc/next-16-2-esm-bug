import { NextResponse } from 'next/server'
import { greet } from '@test/utils'
import { auth } from '../../../../lib/auth'
import superjson from 'superjson'
import { z } from 'zod'

const schema = z.object({ name: z.string() })

export async function GET() {
  const session = await auth()
  const greeting = greet('world')
  const serialized = superjson.stringify({ greeting, session })
  const parsed = schema.safeParse({ name: 'test' })
  return NextResponse.json({ message: greeting, session, serialized, parsed: parsed.success })
}

export async function POST() {
  const session = await auth()
  return NextResponse.json({ message: 'Auth POST works', session })
}

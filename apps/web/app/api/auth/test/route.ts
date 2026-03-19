import { NextResponse } from 'next/server'
import { greet } from '@test/utils'
import { auth } from '../../../../lib/auth'

export async function GET() {
  const session = await auth()
  const greeting = greet('world')
  return NextResponse.json({ message: greeting, session })
}

export async function POST() {
  const session = await auth()
  return NextResponse.json({ message: 'Auth POST works', session })
}

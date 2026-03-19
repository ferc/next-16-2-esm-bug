import { NextResponse } from 'next/server'
import { auth } from '../../../../lib/auth'

export async function GET() {
  const session = await auth()
  return NextResponse.json({ message: 'Auth test endpoint works', session })
}

export async function POST() {
  const session = await auth()
  return NextResponse.json({ message: 'Auth POST works', session })
}

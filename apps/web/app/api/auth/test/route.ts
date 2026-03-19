import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Auth test endpoint works' })
}

export async function POST() {
  return NextResponse.json({ message: 'Auth POST works' })
}

import { NextResponse } from 'next/server'
import { greet, getRepoRoot, scanDirectory } from '@test/utils'
import { findUserById } from '@test/storage'
import { generateGreeting } from '@test/ai-service'
import { cn } from '@test/ui'
import { auth } from '../../../../lib/auth'
import superjson from 'superjson'
import { z } from 'zod'
import path from 'path'

const schema = z.object({ name: z.string() })

export async function GET() {
  const session = await auth()
  const greeting = greet('world')
  const user = findUserById('test-id')
  const aiGreeting = generateGreeting('ai-user')
  const className = cn('text-red-500', 'font-bold')
  const parsed = schema.safeParse({ name: 'test' })

  // Use filesystem operations that cause NFT to trace the whole project
  let repoRoot = ''
  let files: string[] = []
  try {
    repoRoot = await getRepoRoot()
    files = await scanDirectory(path.join(repoRoot, 'packages'), 'packages')
  } catch {
    // Expected to fail on Vercel, but the import is what matters for tracing
  }

  return NextResponse.json({
    message: greeting,
    user,
    aiGreeting,
    className,
    parsed: parsed.success,
    repoRoot,
    filesCount: files.length,
  })
}

export async function POST() {
  const session = await auth()
  return NextResponse.json({ message: 'Auth POST works', session })
}

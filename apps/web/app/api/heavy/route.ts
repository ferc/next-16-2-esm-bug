import { NextResponse } from 'next/server'
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3'
import Redis from 'ioredis'

// Force these into the server bundle
const s3 = new S3Client({ region: 'us-east-1' })

export async function GET() {
  // Just reference them to force bundling, don't actually call
  const s3Type = typeof s3
  const redisType = typeof Redis
  return NextResponse.json({ s3Type, redisType })
}

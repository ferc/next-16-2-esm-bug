import { withSentryConfig } from '@sentry/nextjs'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname, '../../'),
  },
}

export default withSentryConfig(nextConfig, {
  org: 'dummy',
  project: 'dummy',
  silent: true,
  disableLogger: true,
  telemetry: false,
})

import withBundleAnalyzer from '@next/bundle-analyzer'
import { withSentryConfig } from '@sentry/nextjs'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: path.resolve(__dirname, '../../'),
  },
  serverExternalPackages: [
    '@trigger.dev/sdk',
    '@smithy/node-http-handler',
    'util-stream',
    'ioredis',
  ],
}

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

let nextConfigWithPlugins = bundleAnalyzer(nextConfig)

nextConfigWithPlugins = withSentryConfig(nextConfigWithPlugins, {
  org: 'dummy',
  project: 'dummy',
  silent: true,
  disableLogger: true,
  telemetry: false,
})

export default nextConfigWithPlugins

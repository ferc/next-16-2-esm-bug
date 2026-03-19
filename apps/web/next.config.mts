import withBundleAnalyzer from '@next/bundle-analyzer'
import { withSentryConfig } from '@sentry/nextjs'
import type { NextConfig } from 'next'
import { createJiti } from 'jiti'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// jiti env validation with workspace aliases (same pattern as actual project)
const jiti = createJiti(__filename, {
  alias: {
    '@test/storage': path.resolve(__dirname, '../../packages/storage/src'),
    '@test/utils': path.resolve(__dirname, '../../packages/utils/src'),
  },
})
jiti.import('./lib/env')

// Auth cookies for rewrites/redirects
const AUTH_COOKIES = [
  { type: 'cookie' as const, key: 'authjs.session-token' },
  { type: 'cookie' as const, key: '__Secure-authjs.session-token' },
]

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
  // 2. Custom webpack config
  webpack: (config, { isServer, dev }) => {
    if (isServer && !dev) {
      config.devtool = 'source-map'
    }
    config.ignoreWarnings = [
      ...(config.ignoreWarnings ?? []),
      { file: /esm\/platform\/node\/instrumentation.js/ },
      { module: /esm\/platform\/node\/instrumentation.js/ },
    ]
    return config
  },
  // 3. Rewrites/redirects with auth cookies
  rewrites: async () => ({
    beforeFiles: [
      {
        source: '/login',
        destination: '/login',
        missing: AUTH_COOKIES,
      },
    ],
  }),
  redirects: async () => [
    {
      source: '/events',
      destination: '/login',
      missing: AUTH_COOKIES,
      statusCode: 307,
    },
  ],
}

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

let nextConfigWithPlugins = bundleAnalyzer(nextConfig)

// 5. Full Sentry options matching actual project
nextConfigWithPlugins = withSentryConfig(nextConfigWithPlugins, {
  org: 'dummy',
  project: 'dummy',
  silent: true,
  telemetry: false,
  widenClientFileUpload: true,
  reactComponentAnnotation: { enabled: true },
  tunnelRoute: '/error-monitoring',
  disableLogger: true,
  automaticVercelMonitors: true,
})

export default nextConfigWithPlugins

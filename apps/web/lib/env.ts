import { z } from 'zod'
import { greet } from '@test/utils'
import { findUserById } from '@test/storage'

// Validate env vars at build time (matching actual project pattern)
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
})

const env = envSchema.parse(process.env)

// Reference workspace packages to mirror actual jiti alias usage
const _test = greet('build-time')
const _user = findUserById('build-time')

export default env

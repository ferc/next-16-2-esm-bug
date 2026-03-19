// Minimal env validation (mirrors jiti usage in actual project)
const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
}

export default env

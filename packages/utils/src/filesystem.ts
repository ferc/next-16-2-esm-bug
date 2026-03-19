import path from 'path'

export function resolvePath(filePath: string): string {
  return path.resolve(process.cwd(), filePath)
}

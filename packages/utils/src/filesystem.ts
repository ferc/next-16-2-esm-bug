import { readFile, readdir } from 'fs/promises'
import path from 'path'

let repoRootCache: string | null = null

export async function getRepoRoot(): Promise<string> {
  if (repoRootCache != null) {
    return repoRootCache
  }

  let currentDir = process.cwd()
  let prevDir = ''
  while (currentDir !== prevDir) {
    try {
      const packageJsonPath = path.join(currentDir, 'package.json')
      const content = await readFile(packageJsonPath, 'utf-8')
      const pkg = JSON.parse(content) as { name?: string }
      if (pkg.name === 'next-16-2-esm-bug') {
        repoRootCache = currentDir
        return currentDir
      }
    } catch {
      // keep searching
    }
    prevDir = currentDir
    currentDir = path.dirname(currentDir)
  }

  throw new Error('Could not find monorepo root')
}

export async function scanDirectory(dirPath: string, basePath: string): Promise<string[]> {
  const files: string[] = []
  const entries = await readdir(dirPath, { withFileTypes: true })

  for (const entry of entries) {
    const relativePath = `${basePath}/${entry.name}`
    if (entry.isDirectory()) {
      const subFiles = await scanDirectory(path.join(dirPath, entry.name), relativePath)
      files.push(...subFiles)
    } else if (entry.isFile()) {
      files.push(relativePath)
    }
  }

  return files
}

export async function readRepoFile(filePath: string): Promise<string> {
  const repoRoot = await getRepoRoot()
  const resolvedPath = path.resolve(repoRoot, filePath)
  const relativePath = path.relative(repoRoot, resolvedPath)
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    throw new Error(`Path traversal detected: ${filePath}`)
  }
  return readFile(resolvedPath, 'utf-8')
}

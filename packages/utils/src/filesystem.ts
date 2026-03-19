import { readFile } from 'fs/promises'
import path from 'path'

export async function readRepoFile(filePath: string): Promise<string> {
  return readFile(path.resolve(process.cwd(), filePath), 'utf-8')
}

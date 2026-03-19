import { readFile } from 'fs/promises'

export async function readRepoFile(filePath: string): Promise<string> {
  return readFile(filePath, 'utf-8')
}

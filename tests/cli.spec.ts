import fs from 'node:fs'
import { resolve } from 'node:path'
import { afterEach, describe, expect, it } from 'vite-plus/test'
import { clean } from '../src/cli'
import { getCliVersion } from '../src/cli/utils'

const FIXTURES_DIR = resolve(__dirname, 'fixtures')

function createFixture(relativePath: string, content = '') {
  const fullPath = resolve(FIXTURES_DIR, relativePath)
  fs.mkdirSync(resolve(fullPath, '..'), { recursive: true })
  fs.writeFileSync(fullPath, content)
  return fullPath
}

function createFixtureDir(relativePath: string) {
  const fullPath = resolve(FIXTURES_DIR, relativePath)
  fs.mkdirSync(fullPath, { recursive: true })
  return fullPath
}

describe('cli', () => {
  afterEach(() => {
    fs.rmSync(FIXTURES_DIR, { recursive: true, force: true })
  })

  describe('getCliVersion', () => {
    it('should return the version from package.json', () => {
      const version = getCliVersion()
      const pkg = JSON.parse(fs.readFileSync(resolve(__dirname, '../package.json'), 'utf-8'))
      expect(version).toBe(pkg.version)
    })
  })

  describe('clean', () => {
    it('should remove a single file', async () => {
      const file = createFixture('clean/a.txt', 'hello')
      expect(fs.existsSync(file)).toBe(true)

      await clean([file])
      expect(fs.existsSync(file)).toBe(false)
    })

    it('should remove a directory recursively', async () => {
      createFixture('clean/dir/nested/a.txt', 'a')
      createFixture('clean/dir/nested/b.txt', 'b')
      const dir = resolve(FIXTURES_DIR, 'clean/dir')

      await clean([dir])
      expect(fs.existsSync(dir)).toBe(false)
    })

    it('should remove multiple paths at once', async () => {
      const file = createFixture('clean/file.txt', 'content')
      const dir = createFixtureDir('clean/some-dir')

      await clean([file, dir])
      expect(fs.existsSync(file)).toBe(false)
      expect(fs.existsSync(dir)).toBe(false)
    })

    it('should not throw when path does not exist', async () => {
      await expect(clean([resolve(FIXTURES_DIR, 'clean/nonexistent')])).resolves.toBeUndefined()
    })

    it('should remove glob matched paths', async () => {
      createFixture('clean/glob/a.log', 'a')
      createFixture('clean/glob/b.log', 'b')
      createFixture('clean/glob/c.txt', 'c')

      await clean([resolve(FIXTURES_DIR, 'clean/glob/*.log')])
      expect(fs.existsSync(resolve(FIXTURES_DIR, 'clean/glob/a.log'))).toBe(false)
      expect(fs.existsSync(resolve(FIXTURES_DIR, 'clean/glob/b.log'))).toBe(false)
      expect(fs.existsSync(resolve(FIXTURES_DIR, 'clean/glob/c.txt'))).toBe(true)
    })
  })
})

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import { resolve } from 'node:path'
import {
  changelog as varletChangelog,
  commitLint as varletCommitLint,
  lockfileCheck as varletLockfileCheck,
  publish as varletPublish,
  release as varletRelease,
} from '@varlet/release'
import { generate } from 'api-farmer'
import { afterEach, describe, expect, it, vi } from 'vite-plus/test'
import { clean } from '../src/cli'
import { api } from '../src/cli/api'
import { changelog } from '../src/cli/changelog'
import { commitLint } from '../src/cli/commitLint'
import { getConfig } from '../src/cli/config'
import { getHooksDir, hook, writeHooks } from '../src/cli/hook'
import { lockfileCheck } from '../src/cli/lockfileCheck'
import { publish } from '../src/cli/publish'
import { release } from '../src/cli/release'
import { getCliVersion } from '../src/cli/utils'

vi.mock('@varlet/release', () => ({
  release: vi.fn(),
  publish: vi.fn(),
  changelog: vi.fn(),
  commitLint: vi.fn(),
  lockfileCheck: vi.fn(),
}))

vi.mock('api-farmer', () => ({
  generate: vi.fn(),
}))

vi.mock('node:child_process', () => {
  const mock = { execSync: vi.fn() }
  return { ...mock, default: mock }
})

vi.mock('../src/cli/config', () => ({
  getConfig: vi.fn().mockResolvedValue({}),
}))

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
    vi.clearAllMocks()
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

    it('should resolve string config when no patterns given', async () => {
      const file = createFixture('clean-cfg/a.txt', 'content')
      vi.mocked(getConfig).mockResolvedValueOnce({ clean: file })

      await clean()
      expect(fs.existsSync(file)).toBe(false)
    })

    it('should resolve array config when no patterns given', async () => {
      const f1 = createFixture('clean-cfg/b1.txt', 'b1')
      const f2 = createFixture('clean-cfg/b2.txt', 'b2')
      vi.mocked(getConfig).mockResolvedValueOnce({ clean: [f1, f2] })

      await clean()
      expect(fs.existsSync(f1)).toBe(false)
      expect(fs.existsSync(f2)).toBe(false)
    })

    it('should resolve object config with patterns when no patterns given', async () => {
      const file = createFixture('clean-cfg/c.txt', 'c')
      vi.mocked(getConfig).mockResolvedValueOnce({ clean: { patterns: [file] } })

      await clean()
      expect(fs.existsSync(file)).toBe(false)
    })

    it('should handle object config without patterns', async () => {
      vi.mocked(getConfig).mockResolvedValueOnce({ clean: {} })
      await expect(clean()).resolves.toBeUndefined()
    })

    it('should handle missing clean config', async () => {
      vi.mocked(getConfig).mockResolvedValueOnce({})
      await expect(clean()).resolves.toBeUndefined()
    })
  })

  describe('writeHooks', () => {
    it('should write hook scripts to hooksDir', () => {
      const hooksDir = createFixtureDir('hook')

      writeHooks(
        {
          'commit-msg': ['pnpm exec vr commit-lint -p $1'],
          'pre-commit': ['vp staged'],
        },
        hooksDir,
      )

      expect(fs.readFileSync(resolve(hooksDir, 'commit-msg'), 'utf-8')).toBe('pnpm exec vr commit-lint -p $1\n')
      expect(fs.readFileSync(resolve(hooksDir, 'pre-commit'), 'utf-8')).toBe('vp staged\n')
    })

    it('should write multiple commands joined by newline', () => {
      const hooksDir = createFixtureDir('hook')

      writeHooks({ 'pre-commit': ['vp staged', 'pnpm run lint'] }, hooksDir)

      expect(fs.readFileSync(resolve(hooksDir, 'pre-commit'), 'utf-8')).toBe('vp staged\npnpm run lint\n')
    })

    it('should write no files when hook config is empty', () => {
      const hooksDir = createFixtureDir('hook-empty')

      writeHooks({}, hooksDir)

      expect(fs.readdirSync(hooksDir)).toHaveLength(0)
    })
  })

  describe('getHooksDir', () => {
    it('should resolve hooks directory from git config', () => {
      vi.mocked(execSync).mockReturnValueOnce('some/path/hooks\n')

      const result = getHooksDir()

      expect(result).toBe(resolve(process.cwd(), 'some/path'))
      expect(execSync).toHaveBeenCalledWith('git config core.hooksPath', { encoding: 'utf-8' })
    })

    it('should throw when core.hooksPath is not set', () => {
      vi.mocked(execSync).mockImplementationOnce(() => {
        throw new Error('exit code 1')
      })

      expect(() => getHooksDir()).toThrow('core.hooksPath is not set')
    })
  })

  describe('hook()', () => {
    it('should load config and write hook scripts', async () => {
      const hooksDir = createFixtureDir('hook-fn')
      vi.mocked(getConfig).mockResolvedValueOnce({
        hook: { 'pre-commit': ['pnpm lint'] },
      })
      vi.mocked(execSync).mockReturnValueOnce(`${hooksDir}/placeholder\n`)

      await hook()

      expect(fs.readFileSync(resolve(hooksDir, 'pre-commit'), 'utf-8')).toBe('pnpm lint\n')
    })

    it('should write nothing when config has no hooks', async () => {
      const hooksDir = createFixtureDir('hook-fn-empty')
      vi.mocked(getConfig).mockResolvedValueOnce({})
      vi.mocked(execSync).mockReturnValueOnce(`${hooksDir}/placeholder\n`)

      await hook()

      expect(fs.readdirSync(hooksDir)).toHaveLength(0)
    })
  })

  describe('release', () => {
    it('should call @varlet/release with explicit config', async () => {
      const config = { npmTag: 'beta', remote: 'upstream' }

      await release(config)

      expect(varletRelease).toHaveBeenCalledWith(config)
    })

    it('should fall back to config from getConfig', async () => {
      const releaseConfig = { npmTag: 'next' }
      vi.mocked(getConfig).mockResolvedValueOnce({ release: releaseConfig })

      await release()

      expect(varletRelease).toHaveBeenCalledWith(releaseConfig)
    })

    it('should use empty config when getConfig has no release', async () => {
      vi.mocked(getConfig).mockResolvedValueOnce({})

      await release()

      expect(varletRelease).toHaveBeenCalledWith({})
    })
  })

  describe('publish', () => {
    it('should call @varlet/release publish with explicit config', async () => {
      const config = { npmTag: 'beta' }

      await publish(config)

      expect(varletPublish).toHaveBeenCalledWith(config)
    })

    it('should fall back to config from getConfig', async () => {
      const publishConfig = { npmTag: 'next' }
      vi.mocked(getConfig).mockResolvedValueOnce({ publish: publishConfig })

      await publish()

      expect(varletPublish).toHaveBeenCalledWith(publishConfig)
    })

    it('should use empty config when getConfig has no publish', async () => {
      vi.mocked(getConfig).mockResolvedValueOnce({})

      await publish()

      expect(varletPublish).toHaveBeenCalledWith({})
    })
  })

  describe('changelog', () => {
    it('should call @varlet/release changelog with explicit config', async () => {
      const config = { file: 'CHANGES.md' }

      await changelog(config as any)

      expect(varletChangelog).toHaveBeenCalledWith(config)
    })

    it('should fall back to config from getConfig', async () => {
      const changelogConfig = { file: 'CHANGES.md' }
      vi.mocked(getConfig).mockResolvedValueOnce({ changelog: changelogConfig as any })

      await changelog()

      expect(varletChangelog).toHaveBeenCalledWith(changelogConfig)
    })

    it('should use empty config when getConfig has no changelog', async () => {
      vi.mocked(getConfig).mockResolvedValueOnce({})

      await changelog()

      expect(varletChangelog).toHaveBeenCalledWith({})
    })
  })

  describe('commitLint', () => {
    it('should delegate to @varlet/release commitLint', () => {
      const options = { commitMessagePath: '.git/COMMIT_EDITMSG' }

      commitLint(options)

      expect(varletCommitLint).toHaveBeenCalledWith(options)
    })
  })

  describe('lockfileCheck', () => {
    it('should delegate with options', async () => {
      const options = { packageManager: 'pnpm' as const, skipInstall: true }

      await lockfileCheck(options)

      expect(varletLockfileCheck).toHaveBeenCalledWith(options)
    })

    it('should delegate with undefined when no options given', async () => {
      await lockfileCheck()

      expect(varletLockfileCheck).toHaveBeenCalledWith(undefined)
    })
  })

  describe('api', () => {
    it('should call api-farmer generate with explicit config', async () => {
      const config = { input: 'swagger.json' }

      await api(config as any)

      expect(generate).toHaveBeenCalledWith(config)
    })

    it('should fall back to config from getConfig', async () => {
      const apiConfig = { input: 'openapi.yaml' }
      vi.mocked(getConfig).mockResolvedValueOnce({ api: apiConfig as any })

      await api()

      expect(generate).toHaveBeenCalledWith(apiConfig)
    })

    it('should use empty config when getConfig has no api', async () => {
      vi.mocked(getConfig).mockResolvedValueOnce({})

      await api()

      expect(generate).toHaveBeenCalledWith({})
    })
  })
})

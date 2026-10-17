// Syntax-checks every fenced code sample under src/ (English and translations).
// Samples are often partial (a method, a few statements), so each checker retries with a wrapper
// before reporting an error. Missing toolchains are skipped with a notice, unless --strict is passed.
//
// Usage: node scripts/check-code-samples.mjs [--strict] [--lang=python,go]
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, relative } from 'node:path'
import { transform } from 'esbuild'

const args = process.argv.slice(2)
const strict = args.includes('--strict')
const onlyLangs = args.find((a) => a.startsWith('--lang='))?.slice(7).split(',')

const ALIASES = { ts: 'typescript', js: 'javascript', py: 'python', rs: 'rust' }
const work = mkdtempSync(join(tmpdir(), 'dp-samples-'))

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.md') ? [p] : []
  })

/** Runs a command; returns stderr+stdout on failure, null on success. Throws ENOENT if the tool is missing. */
function run(cmd, cmdArgs, input) {
  try {
    execFileSync(cmd, cmdArgs, { input, stdio: ['pipe', 'pipe', 'pipe'], encoding: 'utf8' })
    return null
  } catch (e) {
    if (e.code === 'ENOENT') throw e
    return `${e.stderr ?? ''}${e.stdout ?? ''}`.trim() || e.message
  }
}

const tryEach = async (variants, check) => {
  let first
  for (const code of variants) {
    const err = await check(code)
    if (!err) return null
    first ??= err
  }
  return first
}

const IMPORT_LINE = /^\s*(?:import|package)\s.*$/gm
const imports = (code) => (code.match(IMPORT_LINE) ?? []).join('\n')
const withoutImports = (code) => code.replace(IMPORT_LINE, '')

const PY_CHECK = 'import ast,sys; ast.parse(sys.stdin.read())'
const python = process.platform === 'win32' ? 'python' : 'python3'

// Samples often show a "❌ before" and "✅ after" version of the same class in one block,
// so redeclarations are expected and not treated as errors
const esbuildCheck = (loader) => (code) =>
  transform(code, { loader }).then(
    () => null,
    (e) => {
      if (!e.errors) return e.message
      const errors = e.errors.filter((x) => !/has already been declared/.test(x.text))
      return errors.length ? errors.map((x) => `${x.location?.line}: ${x.text}`).join('\n') : null
    }
  )

const checkers = {
  // Retry as class members for samples that show a lone method
  typescript: (code) => tryEach([code, `class Snippet__ {\n${code}\n}`], esbuildCheck('ts')),
  javascript: esbuildCheck('js'),
  python: (code) => run(python, ['-c', PY_CHECK], code),
  go: (code) => {
    const pkg = /^\s*package\s+\w+/m.test(code) ? code : `package snippet\n${code}`
    return tryEach([pkg, `package snippet\nfunc _() {\n${code}\n}`], (c) => run('gofmt', ['-e'], c))
  },
  rust: (code) =>
    tryEach([code, `fn _snippet() {\n${code}\n}`], (c) => run('rustfmt', ['--edition', '2021', '--emit', 'stdout'], c)),
  java: (code) =>
    tryEach(
      [
        code,
        `class Snippet__ {\n${code}\n}`,
        `class Snippet__ { void run__() throws Exception {\n${code}\n} }`,
        // classes plus top-level demo statements: local classes can't carry top-level modifiers
        `${imports(code)}\nclass Snippet__ { void run__() throws Exception {\n${withoutImports(code).replace(/^(?:(?:public|static|final)\s+)+/gm, '')}\n} }`
      ],
      (c) => {
      const file = join(work, 'Snippet.java')
      writeFileSync(file, c)
      // Stop after parsing: samples reference types defined elsewhere on the page, so only syntax is checked
      return run('javac', ['-XDshould-stop.ifNoError=PARSE', '-XDshould-stop.ifError=PARSE', '-d', join(work, 'out'), file])
    })
}

const samples = []
for (const file of walk('src')) {
  const lines = readFileSync(file, 'utf8').split(/\r?\n/)
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(\s*)```([\w-]+)/)
    if (!m) continue
    const lang = ALIASES[m[2]] ?? m[2]
    const start = i + 1
    const body = []
    while (++i < lines.length && !/^\s*```\s*$/.test(lines[i])) body.push(lines[i].slice(m[1].length))
    if (checkers[lang] && (!onlyLangs || onlyLangs.includes(lang))) samples.push({ file, line: start, lang, code: body.join('\n') })
  }
}

const missing = new Set()
const stats = {}
let failures = 0
for (const s of samples) {
  if (missing.has(s.lang)) continue
  let err
  try {
    err = await checkers[s.lang](s.code)
  } catch (e) {
    if (e.code !== 'ENOENT') throw e
    missing.add(s.lang)
    continue
  }
  stats[s.lang] ??= { checked: 0, failed: 0 }
  stats[s.lang].checked++
  if (err) {
    stats[s.lang].failed++
    failures++
    console.error(`\n✗ ${relative('.', s.file)}:${s.line} [${s.lang}]\n  ${err.split('\n').slice(0, 6).join('\n  ')}`)
  }
}
rmSync(work, { recursive: true, force: true })

console.log('\nCode sample syntax check')
for (const [lang, { checked, failed }] of Object.entries(stats)) console.log(`  ${lang.padEnd(11)} ${checked} checked, ${failed} failed`)
for (const lang of missing) console.log(`  ${lang.padEnd(11)} skipped — toolchain not installed`)

process.exit(failures || (strict && missing.size) ? 1 : 0)

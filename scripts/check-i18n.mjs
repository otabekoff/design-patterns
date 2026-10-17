// Compares every English page with its translation and reports structural drift:
// missing pages, and differing counts of headings, code blocks, mermaid diagrams and ::: containers.
// Usage: node scripts/check-i18n.mjs [--locale=uz]
// Exits non-zero when a page is missing or code blocks differ (code must stay in sync across locales).
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const locale = process.argv.find((a) => a.startsWith('--locale='))?.slice(9) ?? 'uz'
const SRC = 'src'
const LOCALES = new Set(['uz'])

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) return dir === SRC && LOCALES.has(name) ? [] : walk(p)
    return p.endsWith('.md') ? [p] : []
  })

// Comments may be translated, code may not: compare code blocks with comments stripped.
// The stripping is naive (a `//` inside a string is treated as a comment too), but it is applied to
// both sides identically, so it only ever hides differences that are inside comments.
const LINE_COMMENT = { python: '#', py: '#', bash: '#', sh: '#', ruby: '#', sql: '--' }
const MARKUP = new Set(['html', 'vue', 'xml', 'svg'])
function stripComments(lang, code) {
  if (MARKUP.has(lang)) code = code.replace(/<!--[\s\S]*?-->/g, '')
  const marker = LINE_COMMENT[lang] ?? '//'
  if (marker === '//') code = code.replace(/\/\*[\s\S]*?\*\//g, '')
  // Python docstrings are documentation too
  if (marker === '#') code = code.replace(/("""|''')[\s\S]*?\1/g, '')
  return code
    .split('\n')
    .map((line) => {
      const i = line.indexOf(marker)
      return (i >= 0 ? line.slice(0, i) : line).trimEnd()
    })
    .filter(Boolean)
    .join('\n')
}

function codeBlocks(file) {
  const text = readFileSync(file, 'utf8').replace(/\r\n/g, '\n')
  return [...text.matchAll(/^```([\w-]+)[^\n]*\n([\s\S]*?)^```/gm)].map(([, lang, body], i) => ({
    i,
    lang,
    line: text.slice(0, text.indexOf(body)).split('\n').length,
    code: lang === 'mermaid' ? null : stripComments(lang, body)
  }))
}

function profile(file) {
  const text = readFileSync(file, 'utf8')
  const withoutCode = text.replace(/^```[\s\S]*?^```/gm, '')
  return {
    headings: (withoutCode.match(/^#{2,4} /gm) ?? []).length,
    code: (text.match(/^```[\w-]+/gm) ?? []).length,
    mermaid: (text.match(/^```mermaid/gm) ?? []).length,
    containers: (text.match(/^:::\s*[\w-]+/gm) ?? []).length
  }
}

const rows = []
let errors = 0
for (const en of walk(SRC)) {
  const rel = relative(SRC, en)
  const tr = join(SRC, locale, rel)
  if (!existsSync(tr)) {
    errors++
    rows.push(`✗ ${rel}: no ${locale} translation`)
    continue
  }
  const a = profile(en)
  const b = profile(tr)
  const diffs = Object.keys(a)
    .filter((k) => a[k] !== b[k])
    .map((k) => `${k} ${a[k]}→${b[k]}`)
  if (a.code !== b.code || a.mermaid !== b.mermaid) errors++
  if (diffs.length) rows.push(`${a.code !== b.code || a.mermaid !== b.mermaid ? '✗' : '!'} ${rel}: ${diffs.join(', ')}`)

  // Same number of blocks: also require identical code (ignoring comments) block by block
  if (a.code === b.code) {
    const enBlocks = codeBlocks(en)
    const trBlocks = codeBlocks(tr)
    for (const [k, block] of enBlocks.entries()) {
      const other = trBlocks[k]
      if (block.code === null || (other.lang === block.lang && other.code === block.code)) continue
      errors++
      rows.push(`✗ ${rel}: code block ${k + 1} (${block.lang}, en line ${block.line}) differs from ${locale} line ${other.line} beyond comments`)
    }
  }
}

console.log(rows.length ? rows.join('\n') : `All pages have a structurally matching ${locale} translation.`)
console.log(`\n${errors} error(s). (✗ = missing page or code/diagram drift, ! = heading/container drift only)`)
process.exit(errors ? 1 : 0)

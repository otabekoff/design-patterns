// Parses every ```mermaid block under src/ and fails on syntax errors.
// Usage: node scripts/check-mermaid.mjs
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import mermaid from 'mermaid'

const SRC = 'src'

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.md') ? [p] : []
  })

let failures = 0
let count = 0
for (const file of walk(SRC)) {
  const lines = readFileSync(file, 'utf8').split(/\r?\n/)
  for (let i = 0; i < lines.length; i++) {
    if (!/^\s*```mermaid/.test(lines[i])) continue
    const start = i + 1
    const body = []
    while (++i < lines.length && !/^\s*```\s*$/.test(lines[i])) body.push(lines[i])
    count++
    try {
      await mermaid.parse(body.join('\n'))
    } catch (e) {
      // Without a browser DOM, mermaid throws a DOMPurify error *after* a successful parse — that is a pass
      if (String(e?.message).includes('DOMPurify')) continue
      failures++
      console.error(`\n✗ ${relative('.', file)}:${start}\n  ${String(e?.message ?? e).split('\n').join('\n  ')}`)
    }
  }
}

console.log(`\nChecked ${count} mermaid diagram(s), ${failures} failed.`)
process.exit(failures ? 1 : 0)

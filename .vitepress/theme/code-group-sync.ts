import { inBrowser, onContentUpdated } from 'vitepress'

const STORAGE_KEY = 'dp:preferred-code-lang'

// "TypeScript (NestJS Style)" -> "typescript"
const baseLang = (label: string) => label.replace(/\(.*\)/, '').trim().toLowerCase()

const readPreference = () => {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

const writePreference = (lang: string) => {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // storage unavailable (private mode etc.) — syncing still works within the page
  }
}

// Mirrors VitePress's own code-group switching (checked input + `.active` block) without its scrollIntoView,
// so syncing other groups never makes the page jump
function applyPreference(lang: string, except?: Element) {
  document.querySelectorAll('.vp-code-group').forEach((group) => {
    if (group === except) return
    const inputs = Array.from(group.querySelectorAll<HTMLInputElement>('.tabs input'))
    const i = inputs.findIndex((input) => {
      const label = group.querySelector(`label[for="${input.id}"]`)
      return baseLang(label?.textContent ?? '') === lang
    })
    const blocks = group.querySelector('.blocks')
    if (i < 0 || !blocks || inputs[i].checked) return
    inputs[i].checked = true
    Array.from(blocks.children).forEach((block, j) => block.classList.toggle('active', j === i))
  })
}

/** Remembers the language tab a reader picks and applies it to every code group, across pages. */
export function useCodeGroupSync() {
  if (!inBrowser) return

  window.addEventListener('click', (e) => {
    const label = (e.target as Element | null)?.closest?.('.vp-code-group .tabs label') as HTMLLabelElement | null
    if (!label) return
    const lang = baseLang(label.textContent ?? '')
    writePreference(lang)
    applyPreference(lang, label.closest('.vp-code-group') ?? undefined)
  })

  onContentUpdated(() => {
    const lang = readPreference()
    if (lang) applyPreference(lang)
  })
}

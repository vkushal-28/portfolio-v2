// Screenshots a running site at several widths and reports horizontal overflow.
// Usage: node shot.mjs <url> <outDir> [widths=1440,860,360] [waitMs=5000]
import { existsSync, mkdirSync, readdirSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const [url = 'http://localhost:4317/', outDir = '.', widthArg = '1440,860,360', waitArg = '5000'] =
  process.argv.slice(2)

// Playwright isn't a project dependency: use one from the npx cache.
async function loadPlaywright() {
  const npx = join(homedir(), '.npm/_npx')
  for (const dir of existsSync(npx) ? readdirSync(npx) : []) {
    const entry = join(npx, dir, 'node_modules/playwright/index.mjs')
    if (existsSync(entry)) return import(pathToFileURL(entry).href)
  }
  throw new Error('Playwright not found. Run `npx -y playwright --version` once, then retry.')
}

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const { chromium } = await loadPlaywright()
const browser = await chromium.launch(existsSync(CHROME) ? { executablePath: CHROME } : {})
mkdirSync(outDir, { recursive: true })

let failed = false
for (const width of widthArg.split(',').map(Number)) {
  const page = await browser.newPage({ viewport: { width, height: 900 } })
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  await page.goto(url)
  await page.waitForTimeout(Number(waitArg))
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
  const file = join(outDir, `shot-${width}.png`)
  await page.screenshot({ path: file })
  const overflow = scrollWidth > width
  failed ||= overflow || errors.length > 0
  console.log(
    `${width}px  ${overflow ? `OVERFLOW (scrollWidth ${scrollWidth})` : 'no h-scroll'}  ${file}`,
  )
  for (const e of errors) console.log(`  console error: ${e}`)
  await page.close()
}
await browser.close()
process.exit(failed ? 1 : 0)

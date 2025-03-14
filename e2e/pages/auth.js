const fs = require('fs/promises')

const STORAGE = 'auth.json'
const PREVIEW_URL = '?preview_theme_id=175491252572'
const PASSWORD = 'paris'

class Auth {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page
    this.passwordInput = page.locator('#password')
  }

  async goto() {
    await this.page.goto(PREVIEW_URL, { waitUntil: 'domcontentloaded' })
  }

  async loginIfNeeded() {
    if (await this.passwordInput.isVisible()) {
      await this.passwordInput.fill(PASSWORD)
      await Promise.all([
        this.passwordInput.press('Enter'),
        this.page.waitForLoadState('domcontentloaded')
      ])
    }
  }

  /**
   * Loads the stored session from `auth.json`
   * @returns {Promise<{cookies: import('playwright').CookiesArray, url: string} | null>}
   */
  static async loadSession() {
    try {
      const data = await fs.readFile(STORAGE, 'utf-8').catch(() => null)
      return data ? JSON.parse(data) : null
    } catch {
      return null
    }
  }

  /**
   * Saves the current browser session
   * @param {import('playwright').BrowserContext} context
   * @param {import('playwright').Page} page
   */
  static async saveSession(context, page) {
    const cookies = await context.cookies()
    const url = page.url()
    await fs.writeFile(STORAGE, JSON.stringify({ cookies, url }))
  }

  /**
   * Applies a saved session to the browser context
   * @param {import('playwright').BrowserContext} context
   * @param {import('playwright').Page} page
   */
  static async applySession(context, page) {
    const session = await Auth.loadSession()
    if (!session) return

    const { cookies, url } = session
    if (cookies?.length) {
      await context.addCookies(cookies)
    }
    await page.goto(url || PREVIEW_URL, { waitUntil: 'domcontentloaded' })
  }
}

module.exports = { Auth }

import { expect } from '@playwright/test'
import selector from '../utils/selectors.json'

class Sidecart {
  constructor({ page }) {
    this.page = page
    this.cartIcon = this.page.locator(selector.sidecart.open)
    this.closeIcon = this.page.locator(selector.sidecart.close)
    this.section = this.page.locator(selector.sidecart.section)
    this.overlay = this.page.locator(selector.sidecart.overlay)
  }

  async open() {
    await this.cartIcon.click()
  }

  async close() {
    await this.closeIcon.click()
  }

  async closeOutside() {
    await this.overlay.click()
  }

  async isOpen(bolean) {
    await expect(this.section).toHaveAttribute('data-active', bolean.toString(), { timeout: 2500 })
  }

  async validateScroll(state) {
    if (state !== 'hidden' && state !== 'visible') {
      throw new Error(`Invalid state: "${state}". Expected "hidden" or "visible".`)
    }
    await expect(this.page.locator('body')).toHaveCSS('overflow', state, { timeout: 1000 })
  }
}

export default Sidecart

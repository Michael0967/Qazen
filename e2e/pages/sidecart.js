import { expect } from '@playwright/test'
import selector from '../utils/selectors.json'

class Sidecart {
  constructor({ page }) {
    this.page = page
    this.cartIcon = this.page.locator(selector.sidecart.open)
    this.closeIcon = this.page.locator(selector.sidecart.close)
    this.section = this.page.locator(selector.sidecart.section)
    this.overlay = this.page.locator(selector.sidecart.overlay)
    this.upsellSection = this.page.locator(selector.sidecart.upsell.section)
    this.cards = this.page.locator(selector.sidecart.upsell.cards)
    this.addProductUpsell = this.page.locator(selector.sidecart.upsell.addProduct)
    this.item = this.page.locator(selector.sidecart.itemProduct.item)
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

  async addUpsellProductToCart() {
    const cardsLocator = this.upsellSection.locator(this.cards)
    const count = await cardsLocator.count()
    const randomIndex = Math.floor(Math.random() * count)
    const randomCard = cardsLocator.nth(randomIndex)
    await randomCard.locator(this.addProductUpsell).click()
  }

  async checkItemVisibility(shouldBeVisible) {
    await expect(this.item)[shouldBeVisible ? 'toBeVisible' : 'not.toBeVisible']()
  }
}

export default Sidecart

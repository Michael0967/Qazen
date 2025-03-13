class Sidecart {
  constructor({ page }) {
    this.page = page
    this.cartIcon = this.page.locator('[data-cy="cart-icon"]')
    this.closeIcon = this.page.locator('[data-cy="close-sidecart"]')
  }

  async open() {
    await this.cartIcon.click()
  }

  async close() {
    await this.closeIcon.click()
  }
}

export default Sidecart

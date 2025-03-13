const { test, expect } = require('@playwright/test')
const { Auth } = require('../pages/auth')
import Sidecart from '../pages/sidecart'

let context
let page
let sidecart

test.beforeAll(async ({ browser }) => {
  const savedSession = await Auth.loadSession()
  context = await browser.newContext()
  page = await context.newPage()

  if (!savedSession) {
    const auth = new Auth(page)
    await auth.goto()
    await auth.loginIfNeeded()
    await Auth.saveSession(context, page)
  } else {
    await Auth.applySession(context, page)
  }
})

test.beforeEach(async () => {
  sidecart = new Sidecart({ page })
})

test.afterAll(async () => {
  await context.close()
})

// TESTS
test('Opens when clicking the open button.', async () => {
  await sidecart.open()
  await sidecart.isOpen(true)
  await page.screenshot({ path: 'screenshot_test.png' })
})

test('Closes when clicking the "Close" button.', async () => {
  await sidecart.open()
  await sidecart.isOpen(true)
  await sidecart.close()
  await sidecart.isOpen(false)
})

test('Closes when clicking outside the Sidecart.', async () => {
  await sidecart.open()
  await sidecart.isOpen(true)
  await sidecart.closeOutside()
  await sidecart.isOpen(false)
})

// await page.screenshot({ path: 'screenshot_test.png' })

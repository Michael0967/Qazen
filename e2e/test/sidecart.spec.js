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

test('Open sidecart', async () => {
  await sidecart.open()
})

test('Open and close sidecart', async () => {
  await sidecart.open()
  await sidecart.close()
})

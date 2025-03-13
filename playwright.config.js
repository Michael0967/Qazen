// @ts-check
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e/test',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
  use: {
    baseURL: 'https://ricoh-imaging.eu/',
    trace: 'on-first-retry',
    timezoneId: 'Europe/Paris'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } }
    /* { name: 'webkit', use: { ...devices['Desktop Safari'] } } */
  ]
})

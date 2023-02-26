import { test, expect } from '@playwright/test'

test('skeleton test', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.getByRole('button').click()
  await expect(page.locator('p').first()).toContainText('Hello from the client')
})

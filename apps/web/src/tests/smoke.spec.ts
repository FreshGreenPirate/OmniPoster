import { test, expect } from '@playwright/test';

test('dashboard loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Welcome back, Taylor')).toBeVisible();
  await expect(page.getByText('Publishing calendar')).toBeVisible();
});

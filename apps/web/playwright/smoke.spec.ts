import { test, expect } from '@playwright/test';

test('home page renders calendar preview', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Upcoming schedule')).toBeVisible();
});

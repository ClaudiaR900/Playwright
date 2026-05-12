import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Ambassadors' }).click();
  await page.getByRole('img', { name: 'Butch Mayhew\'s avatar' }).click();
  await expect(page.getByRole('img', { name: 'Ben Fellows\'s avatar' })).toBeVisible();
  await page.getByText('Ben Fellows').click();
  await expect(page.locator('section')).toContainText('Butch Mayhew');
  await expect(page.locator('section')).toMatchAriaSnapshot(`
    - listitem:
      - img "Carlos Gauto's avatar"
      - text: Carlos Gauto
      - paragraph: Berazategui
      - paragraph: Argentina
      - paragraph: Spanish, English
      - link "GitHub":
        - /url: https://github.com/charlyautomatiza
      - link "Twitter":
        - /url: https://twitter.com/char_automatiza
      - link "Website":
        - /url: https://linktr.ee/charlyautomatiza
    `);
  await page.getByRole('listitem').filter({ hasText: 'Carlos' }).click();
});
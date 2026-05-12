import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://portal.videc.info/index.html#/');
  await page.getByRole('textbox', { name: 'Benutzername' }).click();
  await page.getByRole('textbox', { name: 'Benutzername' }).fill('admin');
  await page.getByRole('textbox', { name: 'Kennwort' }).click();
  await page.getByRole('textbox', { name: 'Kennwort' }).fill('admin');
  await page.getByRole('button', { name: 'Anmelden' }).click();
  await expect(page.locator('gridster')).toContainText('Kesseltemperatur [°C] (INT 1 h)');
  await expect(page.getByRole('heading', { name: '90,7 [°C]' })).toBeVisible();
  
  await expect(page.locator('gridster')).toContainText('Berlin');
  await expect(page.locator('gridster')).toContainText('Hamburg');
  await expect(page.locator('gridster')).toContainText('Dortmund');
  await expect(page.locator('gridster')).toContainText('Erlangen');

  await expect(page.locator('#navbar-container')).toMatchAriaSnapshot(`- text:  Sichten Dashboard`);
  
});
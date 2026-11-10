import { test, expect } from '@playwright/test';
import { LoginPage, MainPage } from '../pages';

test.beforeEach(async ({ page }) => {
  await page.goto('https://saucedemo.com');
  const login = new LoginPage(page);
  await login.loginWith('standard_user', 'secret_sauce');
});

test('check every product has image, price and add to cart button', async ({ page }) => {
  const main = new MainPage(page);

  const allItems = await main.inventoryItems.all();

  for (const item of allItems) {
    // Sprawdzenie widoczności obrazka
    await expect(main.getItemImage(item)).toBeVisible();

    // Sprawdzenie obecności i widoczności nazwy
    await expect(main.getItemName(item)).toBeVisible();
    await expect(main.getItemName(item)).not.toBeEmpty();

    // Sprawdzenie obecności ceny
    await expect(main.getItemPrice(item)).toBeVisible();
    await expect(main.getItemPrice(item)).toContainText('$');

    // Sprawdzenie obecności przycisku akcji (Add to cart)
    await expect(main.getItemButton(item)).toBeVisible();
    await expect(main.getItemButton(item)).toHaveText('Add to cart');
  }
});

test('verify sorting by price from low to high', async ({ page }) => {
  const main = new MainPage(page);

  await main.selectSortOption('lohi');
  const displayedPrices = await main.getAllProductPrices();
  const expectedSortedPrices = [...displayedPrices].sort((a, b) => a - b)
  expect(displayedPrices).toEqual(expectedSortedPrices);
});

test('verify burger menu', async ({ page }) => {
  const main = new MainPage(page);

  await expect(main.allItemsLink).not.toBeVisible();
  await main.openMenu();
  await expect(main.allItemsLink).toBeVisible();
  await expect(main.logoutLink).toBeVisible();

  await main.closeMenu();
  await expect(main.allItemsLink).not.toBeVisible();

  await main.openMenu();
  await main.logout();
  await expect(page).toHaveURL('https://www.saucedemo.com');
  const login = new LoginPage(page);
  await expect(login.username).toBeVisible();
});

test('verify empty shopping cart', async ({ page }) => {

});

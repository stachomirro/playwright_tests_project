import { test, expect } from '@playwright/test';
import { LoginPage, MainPage } from '../pages';

test.describe('verify login proccess: ', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://saucedemo.com');
  });

  test('successful login', async ({ page }) => {
    const login = new LoginPage(page);
    const main = new MainPage(page);

    await expect(login.logo).toBeVisible();
    await login.loginWith('standard_user', 'secret_sauce');

    await expect(main.title).toContainText('Products');
  });

  test('wrong credentials', async ({ page }) => {
    const login = new LoginPage(page);

    await login.loginWith('standard_user', '1234');

    await expect(login.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });

  test('locked user', async ({ page }) => {
    const login = new LoginPage(page);

    await login.loginWith('locked_out_user', 'secret_sauce');

    await expect(login.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  });

});



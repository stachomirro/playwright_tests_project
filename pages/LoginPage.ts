import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly logo: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly errorMessage: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByText('Swag Labs');
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.errorMessage = page.locator('div.error-message-container.error > h3');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  async loginWith(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}

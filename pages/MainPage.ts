import { Page, Locator } from '@playwright/test';

export class MainPage {
  readonly page: Page;
  readonly title: Locator;
  // sorting
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;
  // burger menu
  readonly menuButton: Locator;
  readonly closeMenuButton: Locator;
  readonly sidebarMenu: Locator;
  readonly logoutLink: Locator;
  readonly allItemsLink: Locator;


  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.inventoryItems = page.locator('[data-test="inventoryItem"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.closeMenuButton = page.getByRole('button', { name: 'Close Menu' });
    this.sidebarMenu = page.locator('.bm-menu-wrap'); // kontener całego menu bocznego
    this.allItemsLink = page.getByRole('button', { name: 'All Items' });
    this.logoutLink = page.getByRole('button', { name: 'Logout' });
  }

  getItemImage(item: Locator): Locator {
    return item.locator('.inventory_item_img img, [data-test^="inventory-item-img"]');
  }

  getItemName(item: Locator): Locator {
    return item.locator('[data-test="inventory-item-name"]');
  }

  getItemPrice(item: Locator): Locator {
    return item.locator('[data-test="inventory-item-price"]');
  }

  getItemButton(item: Locator): Locator {
    return item.getByRole('button');
  }

  // methods for sorting
  async selectSortOption(value: string): Promise<void> {
    await this.sortDropdown.selectOption(value);
  }

  async getAllProductPrices(): Promise<number[]> {
    const priceTexts = await this.page.locator('[data-test="inventory-item-price"]').allInnerTexts();
    return priceTexts.map(text => parseFloat(text.replace('$', '')));
  }

  // methods for burger menu
  async openMenu(): Promise<void> {
    await this.menuButton.click();
  }

  async closeMenu(): Promise<void> {
    await this.closeMenuButton.click();
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }
}
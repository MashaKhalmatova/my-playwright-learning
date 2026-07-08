import { type Locator, type Page } from "@playwright/test";

// Объект страницы каталога товаров и действий с товарами
export class InventoryPage {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;
  readonly productPrices: Locator;
  readonly productItem: Locator;
  readonly productName: Locator;

  // Инициализируем локаторы страницы каталога
  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productPrices = page.locator('[data-test="inventory-item-price"]');
    this.productItem = page.locator('[data-test="inventory-item"]');
    this.productName = page.locator('[data-test="inventory-item-name"]');
  }

  // Переходим на страницу каталога товаров
  async open() {
    await this.page.goto("/inventory.html");
  }

  // Добавляем товар в корзину по названию
  async addProduct(productName: string) {
    const productCard = this.productItem.filter({
      has: this.productName.filter({ hasText: productName }),
    });

    await productCard.getByRole("button").click();
  }

  // Удаляем товар со страницы каталога по названию
  async removeInventoryProduct(productName: string) {
    const productCard = this.productItem.filter({
      has: this.productName.filter({ hasText: productName }),
    });

    await productCard.getByRole("button").click();
  }

  // Открываем корзину со страницы каталога
  async openCart() {
    await this.cartLink.click();
  }

  // Сортируем товары по цене от низкой к высокой
  async sortByPriceLowToHigh() {
    await this.sortDropdown.selectOption("lohi");
  }

  // Считываем все цены товаров и возвращаем их числами
  async getPrices() {
    const pricesText = await this.productPrices.allTextContents();
    return pricesText.map((price) => Number(price.replace("$", "")));
  }
}

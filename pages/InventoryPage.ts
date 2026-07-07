import { type Locator, type Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    // Инициализируем локаторы страницы каталога товаров
    this.page = page;
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.cartLink = page.locator(".shopping_cart_link");
    this.sortDropdown = page.locator(".product_sort_container");
    this.productPrices = page.locator(".inventory_item_price");
  }

  async open() {
    // Переходим на страницу инвентаря
    await this.page.goto("/inventory.html");
  }

  async addProduct(productName: string) {
    // Добавляем товар в корзину по названию
    const productCard = this.page.locator(".inventory_item").filter({
      has: this.page.locator(".inventory_item_name", { hasText: productName }),
    });

    await productCard.getByRole("button").click();
  }

  async removeProduct(productName: string) {
    // Удаляем товар из корзины с каталога
    const productCard = this.page.locator(".inventory_item").filter({
      has: this.page.locator(".inventory_item_name", { hasText: productName }),
    });

    await productCard.getByRole("button").click();
  }

  async openCart() {
    // Открываем страницу корзины
    await this.cartLink.click();
  }

  async sortByPriceLowToHigh() {
    // Применяем сортировку по возрастанию цены
    await this.sortDropdown.selectOption("lohi");
  }

  async getPrices() {
    // Собираем все цены товаров со страницы
    const pricesText = await this.productPrices.allTextContents();
    return pricesText.map((price) => Number(price.replace("$", "")));
  }
}

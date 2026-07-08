import { type Locator, type Page } from "@playwright/test";

// Объект страницы корзины и действий, связанных с ней
export class CartPage {
  readonly page: Page;
  readonly productNames: Locator;
  readonly cartBadge: Locator;
  readonly checkoutButton: Locator;

  // Инициализируем локаторы страницы корзины
  constructor(page: Page) {
    this.page = page;
    this.productNames = page.locator('[data-test="inventory-item-name"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  // Переходим на страницу корзины
  async open() {
    await this.page.goto("/cart.html");
  }

  // Удаляем товар из корзины по названию
  async removeProduct(productName: string) {
    const cartItem = this.page.locator('[data-test="inventory-item"]').filter({
      has: this.page.locator('[data-test="inventory-item-name"]', { hasText: productName }),
    });

    await cartItem.getByRole("button", { name: /remove/i }).click();
  }

  // Переходим к оформлению заказа из корзины
  async goToCheckout() {
    await this.checkoutButton.click();
  }
}

import { type Locator, type Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly productNames: Locator;
  readonly cartBadge: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    // Инициализируем локаторы страницы корзины
    this.page = page;
    this.productNames = page.locator(".inventory_item_name");
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.checkoutButton = page.getByRole("button", { name: "Checkout" });
  }

  async open() {
    // Переходим на страницу корзины
    await this.page.goto("/cart.html");
  }

  async removeProduct(productName: string) {
    // Удаляем товар из корзины по названию
    const cartItem = this.page.locator(".cart_item").filter({
      has: this.page.locator(".inventory_item_name", { hasText: productName }),
    });

    await cartItem.getByRole("button", { name: /remove/i }).click();
  }

  async goToCheckout() {
    // Переходим к оформлению заказа
    await this.checkoutButton.click();
  }
}

import { type Locator, type Page } from "@playwright/test";

// Объект страницы оформления заказа: личные данные, обзор и завершение
export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly productName: Locator;
  readonly successMessage: Locator;

  // Инициализируем локаторы страницы оформления заказа
  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.successMessage = page.locator('[data-test="complete-header"]');
  }

  // Открываем первый шаг оформления заказа
  async open() {
    await this.page.goto('/checkout-step-one.html');
  }

  // Заполняем личные данные и переходим к обзору заказа
  async fillPersonalInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  // Завершаем заказ на странице обзора
  async finishOrder() {
    await this.finishButton.click();
  }
}

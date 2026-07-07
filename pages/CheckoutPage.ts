import { type Locator, type Page } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly productName: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    // Инициализируем локаторы страницы оформления заказа
    this.page = page;
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.productName = page.locator('.inventory_item_name');
    this.successMessage = page.locator('.complete-header');
  }

  async open() {
    // Открываем первый шаг оформления заказа
    await this.page.goto('/checkout-step-one.html');
  }

  async fillPersonalInfo(firstName: string, lastName: string, postalCode: string) {
    // Заполняем данные пользователя и переходим к следующему шагу
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async finishOrder() {
    // Завершаем заказ
    await this.finishButton.click();
  }
}

import { type Locator, type Page, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly errorMessages = {
    invalid_сredentials: 'Epic sadface: Username and password do not match any user in this service',
    missing_username: 'Epic sadface: Username is required',
    missing_password: 'Epic sadface: Password is required',
    locked_out: 'Epic sadface: Sorry, this user has been locked out.',
  };

  constructor(page: Page) {
    // Инициализируем локаторы страницы логина
    this.page = page;
    this.usernameInput = page.getByPlaceholder("Username");
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async open() {
    // Открываем страницу авторизации
    await this.page.goto("/");
  }

  async login(username: string, password: string) {
    // Заполняем форму логина и отправляем её
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyErrorMessage(expectedText: keyof typeof this.errorMessages) {
    // Проверяем, что сообщение об ошибке отображается и содержит нужный текст
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(this.errorMessages[expectedText]);
  }
}
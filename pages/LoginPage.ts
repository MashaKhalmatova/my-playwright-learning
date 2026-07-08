import { type Locator, type Page, expect } from "@playwright/test";

// Объект страницы для логина и действий на странице входа
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly errors = {
    invalid_credentials: 'Epic sadface: Username and password do not match any user in this service',
    missing_username: 'Epic sadface: Username is required',
    missing_password: 'Epic sadface: Password is required',
    locked_out: 'Epic sadface: Sorry, this user has been locked out.',
  };

  // Инициализируем локаторы страницы логина
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');

  }

  // Открываем страницу логина
  async open() {
    await this.page.goto("/");
  }

  // Отправляем данные пользователя на странице входа
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Проверяем, что отображается правильное сообщение об ошибке логина
  async verifyErrorMessage(expectedText: keyof typeof this.errors) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(this.errors[expectedText]);
  }
}
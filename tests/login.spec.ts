import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { lockedUser, validUser } from "../test-data/users";

// Тесты для авторизации на странице SauceDemo
test.describe("Login", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    // Перед каждым тестом создаём объект страницы логина и открываем страницу входа
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  // Позитивный кейс: стандартный пользователь должен успешно войти и перейти на страницу товаров
  test("standard user can log in", async ({ page }) => {
    await loginPage.login(validUser.user, validUser.password);
    await expect(page).toHaveURL(/inventory/);
  });

  // Негативный кейс: пустой пароль должен показать сообщение об ошибке
  test("empty password sees error message", async () => {
    await loginPage.login(validUser.user, "");
    await loginPage.verifyErrorMessage("missing_password");
  });

  // Негативный кейс: пустой логин должен показать сообщение об ошибке
  test("empty user sees error message", async () => {
    await loginPage.login("", validUser.password);
    await loginPage.verifyErrorMessage("missing_username");
  });

  // Негативный кейс: неверные данные должны показать ошибку об отсутствии аккаунта
  test("invalid user sees error message", async () => {
    await loginPage.login("invalid_user", "invalid_password");
    await loginPage.verifyErrorMessage("invalid_credentials");
  });

  // Негативный кейс: заблокированный пользователь не должен пройти авторизацию
  test("locked user sees error message", async () => {
    await loginPage.login(lockedUser.user, lockedUser.password);
    await loginPage.verifyErrorMessage("locked_out");
  });
});
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { lockedUser, validUser } from "../test-data/users";

test.describe("Login", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  // Проверяем успешный вход стандартного пользователя
  test("standard user can log in", async ({ page }) => {
    await loginPage.login(validUser.user, validUser.password);
    await expect(page).toHaveURL(/inventory/);
  });

  // Проверяем ошибку при пустом пароле
  test("empty password sees error message", async () => {
    await loginPage.login("validUser.user", "");
    await loginPage.verifyErrorMessage("missing_password");
  });
  // Проверяем ошибку при пустом имени пользователя
  test("empty user sees error message", async () => {
    await loginPage.login("", "validUser.password");
    await loginPage.verifyErrorMessage("missing_username");
  });
  
  // Проверяем ошибку для заблокированного пользователя
  test("locked user sees error message", async () => {
    await loginPage.login(lockedUser.user, lockedUser.password);
    await loginPage.verifyErrorMessage("locked_out");
  });
});
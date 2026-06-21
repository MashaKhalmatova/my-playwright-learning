import { test, expect } from "@playwright/test";
test.describe("SauceDemo", () => {
  

  test.beforeEach(async ({ page }) => {
    await page.goto('/'); 
  })
test("login should redirect to inventory", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");   // ← is this the real placeholder?
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/inventory/);
});
// Root cause: placeholder text was "User Name" but actual is "Username"
// Fix: changed to getByPlaceholder("Username")
// How I verified: ran npx playwright test --headed — test passed ✅


test("error message on wrong password", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("wrong_password");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(
        page.getByText("Epic sadface: Username and password do not match any user in this service"),).toBeVisible();
}); 
// Root cause: 1. Element has no data-testid="error" 
// Root cause: 2. Error text was incomplete
// Fix: 1. Replaced getByTestId("error") with getByText(...) 
// Fix: 2. Updated text to full: "Epic sadface: Username and password do not match any user in this service"
// How I verified: Ran npx playwright test --headed — test passed ✅


test("cart badge appears after adding product", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await page.locator("[data-test=\"add-to-cart-sauce-labs-backpack\"]").click();   // ← something missing here

  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
  123456
});
})
//Root cause: Missing "await" before page.locator(...).click()
//Fix: Added "await" before the click action
//How I verified: Ran npx playwright test --headed — test passed ✅
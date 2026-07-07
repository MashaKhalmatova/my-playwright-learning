import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { validUser } from "../test-data/users";

test.describe("Checkout flow", () => {
  // Проверяем полный happy path оформления заказа
  test("user can complete a purchase successfully", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const productName = "Sauce Labs Backpack";

    await test.step("Login and add a product to the cart", async () => {
      await loginPage.open();
      await loginPage.login(validUser.user, validUser.password);
      await inventoryPage.open();
      await inventoryPage.addProduct(productName);
    });

    await test.step("Open cart and start checkout", async () => {
      await inventoryPage.openCart();
      await cartPage.goToCheckout();
    });

    await test.step("Enter personal information and continue", async () => {
      await checkoutPage.fillPersonalInfo("John", "Doe", "12345");
    });

    await test.step("Verify overview and finish the order", async () => {
      await expect(checkoutPage.productName.first()).toHaveText(productName);
      await checkoutPage.finishOrder();
      await expect(checkoutPage.successMessage).toHaveText("Thank you for your order!");
    });
  });
});

test.describe("Product sorting", () => {
  // Проверяем сортировку товаров по цене от самой низкой к высокой
  test("user can sort products by price from low to high", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.open();
    await loginPage.login(validUser.user, validUser.password);
    await inventoryPage.open();

    await inventoryPage.sortByPriceLowToHigh();

    const prices = await inventoryPage.getPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  });
});

import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { validUser } from "../test-data/users";

// Проверка полного оформления заказа на SauceDemo
test.describe("Checkout flow", () => {
  test("user can complete a purchase successfully", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const productName = "Sauce Labs Backpack";

    await test.step("Login and add a product to the cart", async () => {
      // Логинимся и добавляем один товар в корзину
      await loginPage.open();
      await loginPage.login(validUser.user, validUser.password);
      await inventoryPage.open();
      await inventoryPage.addProduct(productName);
    });

    await test.step("Open cart and start checkout", async () => {
      // Переходим в корзину и начинаем оформление заказа
      await inventoryPage.openCart();
      await cartPage.goToCheckout();
    });

    await test.step("Enter personal information and continue", async () => {
      // Заполняем данные покупателя и продолжаем
      await checkoutPage.fillPersonalInfo("John", "Doe", "12345");
    });

    await test.step("Verify overview and finish the order", async () => {
      // Проверяем товар на странице overview и завершаем заказ
      await expect(checkoutPage.productName.first()).toHaveText(productName);
      await checkoutPage.finishOrder();
      await expect(checkoutPage.successMessage).toHaveText("Thank you for your order!");
    });
  });
});

// Тест сортировки товаров по цене на странице каталога
test.describe("Product sorting", () => {
  test("user can sort products by price from low to high", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // Логинимся и открываем страницу товаров
    await loginPage.open();
    await loginPage.login(validUser.user, validUser.password);
    await inventoryPage.open();

    // Выбираем сортировку цен от низкой к высокой
    await inventoryPage.sortByPriceLowToHigh();

    // Считываем отображаемые цены и проверяем порядок по возрастанию
    const prices = await inventoryPage.getPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  });
});

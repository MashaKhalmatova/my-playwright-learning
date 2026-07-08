import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { validUser } from "../test-data/users";

// Тесты, связанные с корзиной: добавление, удаление и отображение товаров
test.describe("Cart behavior", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    // Перед каждым тестом логинимся и открываем страницу инвентаря
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.open();
    await loginPage.login(validUser.user, validUser.password);
    await inventoryPage.open();
  });

  // Проверка, что значок корзины показывает 1 после добавления одного товара
  test("cart badge shows correct count after adding a product", async () => {
    const productName = "Sauce Labs Backpack";

    await inventoryPage.addProduct(productName);
    await expect(inventoryPage.cartBadge).toHaveText("1");
  });

  // Проверка, что добавленный товар отображается в списке корзины
  test("cart page shows the name of the selected product", async () => {
    const productName = "Sauce Labs Backpack";

    await inventoryPage.addProduct(productName);
    await inventoryPage.openCart();
    await expect(cartPage.productNames.first()).toHaveText(productName);
  });

  // Проверка, что удаление товара из корзины обновляет счётчик
  test("removing a product updates the cart", async () => {
    const productName = "Sauce Labs Backpack";

    await inventoryPage.addProduct(productName);
    await inventoryPage.openCart();
    await cartPage.removeProduct(productName);
    await expect(cartPage.cartBadge).toHaveCount(0);
  });

  // Проверка удаления товара прямо на странице инвентаря, без перехода в корзину
  test("user can remove a product directly from inventory", async () => {
    const productName = "Sauce Labs Backpack";

    await inventoryPage.addProduct(productName);
    await expect(inventoryPage.cartBadge).toHaveText("1");

    await inventoryPage.removeInventoryProduct(productName);
    await expect(inventoryPage.cartBadge).toHaveCount(0);

    await inventoryPage.openCart();
    await expect(cartPage.productNames).toHaveCount(0);
  });

  // Проверка корректного увеличения счётчика при добавлении нескольких товаров
  test("adding multiple products shows correct badge count", async () => {
    await inventoryPage.addProduct("Sauce Labs Backpack");
    await inventoryPage.addProduct("Sauce Labs Bolt T-Shirt");

    await expect(inventoryPage.cartBadge).toHaveText("2");
  });
});

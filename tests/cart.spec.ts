import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { validUser } from "../test-data/users";

test.describe("Cart behavior", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.open();
    await loginPage.login(validUser.user, validUser.password);
    await inventoryPage.open();
  });

  // Проверяем, что счётчик корзины увеличивается после добавления товара
  test("cart badge shows correct count after adding a product", async () => {
    const productName = "Sauce Labs Backpack";

    await inventoryPage.addProduct(productName);
    await expect(inventoryPage.cartBadge).toHaveText("1");
  });

  // Проверяем, что выбранный товар отображается в корзине
  test("cart page shows the name of the selected product", async () => {
    const productName = "Sauce Labs Backpack";

    await inventoryPage.addProduct(productName);
    await inventoryPage.openCart();
    await expect(cartPage.productNames.first()).toHaveText(productName);
  });

  // Проверяем, что удаление товара обновляет корзину
  test("removing a product updates the cart", async () => {
    const productName = "Sauce Labs Backpack";

    await inventoryPage.addProduct(productName);
    await inventoryPage.openCart();
    await cartPage.removeProduct(productName);
    await expect(cartPage.cartBadge).toHaveCount(0);
  });

  // Проверяем, что счётчик корзины корректно считает несколько товаров
  test("adding multiple products shows correct badge count", async () => {
    await inventoryPage.addProduct("Sauce Labs Backpack");
    await inventoryPage.addProduct("Sauce Labs Bolt T-Shirt");

    await expect(inventoryPage.cartBadge).toHaveText("2");
  });
});

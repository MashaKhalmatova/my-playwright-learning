import { test, expect } from '@playwright/test';
import { sauceUser } from '../test-data';

test.describe("SauceDemo", () => {

 test.beforeEach(async ({ page }) => {
    await page.goto('/'); 
  })

    test("Task 1 — Login (happy path)", async ({ page }) => { 
        await page.getByPlaceholder("Username").fill(sauceUser.user);
        await page.getByPlaceholder("Password").fill(sauceUser.password);
        await page.getByRole("button", { name: "Login" }).click();
        await expect(page).toHaveURL(/inventory/);
    })

    test("Task 2 - Negative login", async ({ page }) => { 
        await page.getByPlaceholder("Username").fill(sauceUser.user);
        await page.getByPlaceholder("Password").fill("nepra");
        await page.getByRole("button", { name: "Login" }).click();
    await expect(
        page.getByText("Epic sadface: Username and password do not match any user in this service"),).toBeVisible();
    }
)

    test("Task 3 - Add product to cart", async ({ page }) => {
        await page.getByPlaceholder("Username").fill(sauceUser.user);
        await page.getByPlaceholder("Password").fill(sauceUser.password);
        await page.getByRole("button", { name: "Login" }).click();

        await page.getByRole("button", { name: "Add to cart" }).last().click();
        await expect(
        page.locator(".shopping_cart_badge"),
        "Cart badge should show 1 after adding a product").toHaveText("1");
    })

    test("Task 4 - Remove product from cart", async ({ page }) => {
        await page.getByPlaceholder("Username").fill(sauceUser.user);
        await page.getByPlaceholder("Password").fill(sauceUser.password);
        await page.getByRole("button", { name: "Login" }).click();

        await page.getByRole("button", { name: "Add to cart" }).last().click();
        await page.getByRole("button", { name: "Remove" }).last().click();
        await expect(page.locator(".shopping_cart_badge"),
        "Cart badge should not be visible after removing product").not.toBeVisible();
    }) 

    test("Task 5 - Empty form validation", async ({ page }) => { 
        await page.getByPlaceholder("Username").fill("");
        await page.getByPlaceholder("Password").fill("");
        await page.getByRole("button", { name: "Login" }).click();
        await expect(
        page.getByText("Epic sadface: Username is required"),).toBeVisible();
    }) 
   
    test("Bonus 1 - Multiple products", async ({ page }) => {
        await page.getByPlaceholder("Username").fill(sauceUser.user);
        await page.getByPlaceholder("Password").fill(sauceUser.password);
        await page.getByRole("button", { name: "Login" }).click();

        await page.getByRole("button", { name: "Add to cart" }).nth(0).click();
        await page.getByRole("button", { name: "Add to cart" }).nth(1).click();
        await page.getByRole("button", { name: "Add to cart" }).nth(2).click();

        await page.getByRole("button", { name: "Remove" }).nth(2).click();
        await expect(
            page.locator(".shopping_cart_badge"),
            "Cart badge should show 2 after adding a product"
        ).toHaveText("2");
    })

    test("Bonus 2 - Sorting ", async ({ page }) => {
    await page.getByPlaceholder("Username").fill(sauceUser.user);
    await page.getByPlaceholder("Password").fill(sauceUser.password);
    await page.getByRole("button", { name: "Login" }).click();

    const firstItem = page.locator(".inventory_item_price").first()
    const nameBefore = await firstItem.textContent();
    await page.getByRole("combobox").selectOption("lohi");
    const nameAfter = await firstItem.textContent();
    expect(nameBefore).not.toBe(nameAfter);
    
    })


    test("Bonus 3 - State after refresh", async ({ page }) => {
    await page.getByPlaceholder('Username').fill(sauceUser.user)
    await page.getByPlaceholder('Password').fill(sauceUser.password)
    await page.getByRole('button', { name: 'Login' }).click()

    await page.getByRole('button', { name: 'Add to cart' }).first().click()
    await expect(
      page.locator(".shopping_cart_badge"),
      'Cart badge should show 1 after adding a product'
    ).toHaveText('1')
    await page.reload()
    await expect(
      page.locator('.shopping_cart_badge'),
      'Cart badge should still show 1 after page refresh'
    ).toHaveText('1')
    })

        test("Task 6 — Login (locked user)", async ({ page }) => { 
        await page.getByPlaceholder("Username").fill("locked_out_user");
        await page.getByPlaceholder("Password").fill("secret_sauce");
        await page.getByRole("button", { name: "Login" }).click();
        await expect(
        page.getByText("Epic sadface: Sorry, this user has been locked out."),).toBeVisible();
    })
})

test.describe("SauceDemoStage", () => {

 test.beforeEach(async ({ page }) => {
    await page.goto('/'); 
  })
      test("Login (happy path)", async ({ page }) => { 
        await page.getByPlaceholder("Username").fill(sauceUser.user);
        await page.getByPlaceholder("Password").fill(sauceUser.password);
        await page.getByRole("button", { name: "Login" }).click();
        await expect(page).toHaveURL(/inventory/);
    })
        test("Login (locked user)", async ({ page }) => { 
        await page.getByPlaceholder("Username").fill("locked_out_user");
        await page.getByPlaceholder("Password").fill("secret_sauce");
        await page.getByRole("button", { name: "Login" }).click();
        await expect(
        page.getByText("Epic sadface: Sorry, this user has been locked out."),).toBeVisible();
    })
        test("Add 2 productsto cart", async ({ page }) => {
        await page.getByPlaceholder("Username").fill(sauceUser.user);
        await page.getByPlaceholder("Password").fill(sauceUser.password);
        await page.getByRole("button", { name: "Login" }).click();

        await page.getByRole("button", { name: "Add to cart" }).nth(0).click();
        await page.getByRole("button", { name: "Add to cart" }).nth(1).click();        
        await expect(
        page.locator(".shopping_cart_badge"),
        "Cart badge should show 2 after adding two products").toHaveText("2");
    })
    test("Remove product from cart", async ({ page }) => {
        await page.getByPlaceholder("Username").fill(sauceUser.user);
        await page.getByPlaceholder("Password").fill(sauceUser.password);
        await page.getByRole("button", { name: "Login" }).click();

        await page.getByRole("button", { name: "Add to cart" }).nth(0).click();
        await page.getByRole("button", { name: "Add to cart" }).nth(1).click();   
        await page.getByRole("button", { name: "Remove" }).nth(1).click();
       await expect(
        page.locator(".shopping_cart_badge"),
        "Cart badge should show 1 after removing one product").toHaveText("1");
    }) 
    test("Complete checkout and see success message", async ({ page }) => {
        await page.getByPlaceholder("Username").fill(sauceUser.user);
        await page.getByPlaceholder("Password").fill(sauceUser.password);
        await page.getByRole("button", { name: "Login" }).click();

        await page.getByRole("button", { name: "Add to cart" }).nth(0).click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.getByRole("button", { name: "Checkout" }).click();
        await page.getByPlaceholder("First Name").fill("Mariia");
        await page.getByPlaceholder("Last Name").fill("Khalmatova");
        await page.getByPlaceholder("Zip/Postal Code").fill("12345");
        await page.getByRole("button", { name: "Continue" }).click();
        await page.getByRole("button", { name: "Finish" }).click();
        await expect(
        page.getByText("THANK YOU FOR YOUR ORDER"),).toBeVisible();
      
    }) 
  })

import { test, expect } from "@playwright/test";

// Function to encapsulate login actions
async function login(page, username, password) {
  await page.goto("https://www.saucedemo.com/");
  await page.fill('[data-test="username"]', username);
  await page.fill('[data-test="password"]', password);
  await page.click('[data-test="login-button"]');
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  await expect(page).toHaveTitle(/.*Swag Labs/);
}

// Function to encapsulate adding products to cart
async function addProductsToCart(page) {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.waitForSelector('[data-test="inventory-item"]');
}

// Function to complete the purchase process
async function completePurchase(page, username) {
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill(username);
  await page.locator('[data-test="lastName"]').fill("Dela Cruz");
  await page.locator('[data-test="postalCode"]').fill("5400");
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="shipping-info-label"]').isVisible();
  await page.locator('[data-test="finish"]').click();
  await page.locator('[data-test="title"]').isVisible();
  await page.locator('[data-test="complete-header"]').isVisible();
  await page.locator('[data-test="back-to-products"]').click();
}

// Test cases for each set of credentials
const credentials = [
  { username: "standard_user", password: "secret_sauce" },
  { username: "visual_user", password: "secret_sauce" },
];

test.describe("Main test", () => {
  credentials.forEach(({ username, password }) => {
    test(`Tests for ${username}`, async ({ page }) => {
      try {
        //test case 1
        await login(page, username, password);
        //test case 2
        await addProductsToCart(page);
        const cartItems = await page
          .locator('[data-test="inventory-item"]')
          .count();
        expect(cartItems).toBe(2);
        //test case 3
        await completePurchase(page, username);
        await page.close();
      } catch (error) {
        console.error(`Login failed for ${username}: ${error.message}`);
        throw error;
      }
    });
  });
});

// Close the browser after all tests have been run

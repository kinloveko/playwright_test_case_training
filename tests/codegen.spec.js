import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );

  await page.getByPlaceholder("Username").fill("Admin");
  await page.getByPlaceholder("Password").fill("admin123");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("link", { name: "Dashboard" }).click();
  await page.getByRole("banner").getByText("Manda M").click();
  await page.waitForTimeout(2000);
  await page
    .getByRole("banner")
    .getByRole("img", { name: "profile picture" })
    .click();
  await page.getByRole("menuitem", { name: "Logout" }).click();
});

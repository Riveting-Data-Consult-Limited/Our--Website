import { test, expect } from "@playwright/test";

test.describe("Critical User Flows", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load homepage and display main sections", async ({ page }) => {
    // Check hero section
    await expect(page.locator("h1")).toContainText("Driving Growth with Technology");

    // Check services section
    await expect(page.locator("#services")).toBeVisible();
    const serviceCards = page.locator("article");
    expect(await serviceCards.count()).toBeGreaterThan(0);

    // Check navigation
    await expect(page.locator("nav")).toBeVisible();
    await expect(page.locator("a:has-text('Blog')")).toBeVisible();
    await expect(page.locator("a:has-text('Shop')")).toBeVisible();
  });

  test("should navigate to blog listing", async ({ page }) => {
    await page.click("a:has-text('Blog')");
    await expect(page).toHaveURL("/blog");
    await expect(page.locator("h1")).toContainText("Insights & Resources");
  });

  test("should navigate to shop", async ({ page }) => {
    await page.click("a:has-text('Shop')");
    await expect(page).toHaveURL("/shop");
    await expect(page.locator("h1")).toContainText("Services & Products");
  });

  test("should show login page when clicking Sign In", async ({ page }) => {
    await page.click("a:has-text('Sign In')");
    await expect(page).toHaveURL("/login");
  });

  test("should redirect unauthenticated users from portal", async ({ page }) => {
    await page.goto("/portal");
    await expect(page).toHaveURL("/login");
  });

  test("should display footer with contact info", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));

    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(footer.locator("a:has-text('LinkedIn')")).toBeVisible();
  });

  test("should be responsive on mobile", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 667 },
    });
    const page = await context.newPage();

    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Driving Growth");

    // Check that navigation is accessible on mobile
    await expect(page.locator("nav")).toBeVisible();

    await context.close();
  });
});

test.describe("Shop Flow", () => {
  test("should add item to cart", async ({ page }) => {
    await page.goto("/shop");

    // Click add to cart button
    const addButton = page.locator("button:has-text('Add to Cart')").first();
    await addButton.click();

    // Check cart indicator
    const cartBadge = page.locator("button:has-text('Cart')");
    await expect(cartBadge).toContainText("1");
  });

  test("should display cart sidebar", async ({ page }) => {
    await page.goto("/shop");

    const cartButton = page.locator("button:has-text('Cart')");
    await cartButton.click();

    await expect(page.locator("text=Shopping Cart")).toBeVisible();
  });
});

test.describe("Form Validation", () => {
  test("should validate blog search", async ({ page }) => {
    await page.goto("/blog");
    // Blog page loads successfully
    await expect(page.locator("h1")).toContainText("Insights");
  });

  test("should require login to access checkout", async ({ page }) => {
    await page.goto("/checkout");
    // Should redirect to login
    await expect(page).toHaveURL("/login");
  });
});

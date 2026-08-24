import { test, expect } from "@playwright/test";

/**
 * Conversion gates for the homepage CTAs and contact path.
 * Tanner requested the hero order: Watch the reel → The book → Tanner’s bio,
 * with the bio CTA scrolling to Meet Tanner. The persistent header contact CTA
 * must still scroll to the contact section.
 */
test.describe("Homepage CTAs", () => {
  test("hero CTAs have the requested order and destinations", async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });
    const heroLinks = page.locator("#home").getByRole("link");

    await expect(heroLinks).toHaveCount(3);
    await expect(heroLinks.nth(0)).toHaveText("Watch the reel");
    await expect(heroLinks.nth(1)).toHaveText("The book");
    await expect(heroLinks.nth(1)).toHaveAttribute("href", "#author");
    await expect(heroLinks.nth(2)).toHaveText("Tanner’s bio");
    await expect(heroLinks.nth(2)).toHaveAttribute("href", "#meet");
  });

  test("clicking Tanner’s bio scrolls Meet Tanner into view", async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });
    await page.locator("#home").getByRole("link", { name: "Tanner’s bio" }).click();
    await expect(page).toHaveURL(/#meet/);
    await expect(page.locator("#meet")).toBeInViewport();
  });

  test("header Get in touch (desktop) scrolls to contact", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Header CTA is hidden below the sm breakpoint");
    await page.goto("/", { waitUntil: "load" });
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Get in touch" })
      .click();
    await expect(page).toHaveURL(/#contact/);
    await expect(
      page.locator("#contact").getByRole("heading", { name: "Let's talk." }),
    ).toBeInViewport();
  });

  test("Email Tanner opens mail to Tanner with a prefilled subject and body", async ({
    page,
  }) => {
    await page.goto("/#contact", { waitUntil: "load" });
    const email = page.locator("#contact").getByRole("link", { name: "Email Tanner" });
    await expect(email).toBeVisible();
    const href = await email.getAttribute("href");
    expect(href).toBeTruthy();
    const parsed = new URL(href!);
    expect(parsed.protocol).toBe("mailto:");
    expect(parsed.pathname).toBe("Castoramedia1@gmail.com");
    expect(parsed.searchParams.get("subject")).toBe(
      "Contacting from your website",
    );
    expect(parsed.searchParams.get("body")).toBe("Hello Tanner,");
  });
});

import { test, expect } from "@playwright/test";

/**
 * Conversion gate: "Get in touch" must land on the contact section.
 * A mailto: hero CTA is a fail — many phones have no mail handler, so the
 * primary hire button looks dead.
 */
test.describe("Get in touch", () => {
  test("hero CTA is an in-page #contact link, not mailto", async ({ page }) => {
    await page.goto("/");
    const heroCta = page.locator("#home").getByRole("link", { name: "Get in touch" });
    await expect(heroCta).toBeVisible();
    await expect(heroCta).toHaveAttribute("href", "#contact");
  });

  test("clicking hero Get in touch scrolls the contact section into view", async ({
    page,
  }) => {
    await page.goto("/");
    await page.locator("#home").getByRole("link", { name: "Get in touch" }).click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(page.locator("#contact")).toBeInViewport();
    await expect(
      page.locator("#contact").getByRole("heading", { name: "Let's talk." }),
    ).toBeVisible();
  });

  test("header Get in touch (desktop) scrolls to contact", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Header CTA is hidden below the sm breakpoint");
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Get in touch" })
      .click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(page.locator("#contact")).toBeInViewport();
  });

  test("contact still offers a real mailto for Email Tanner", async ({ page }) => {
    await page.goto("/#contact");
    const email = page.locator("#contact").getByRole("link", { name: "Email Tanner" });
    await expect(email).toBeVisible();
    const href = await email.getAttribute("href");
    expect(href).toMatch(/^mailto:[^@]+@/);
  });
});

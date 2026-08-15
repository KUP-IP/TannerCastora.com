import { test, expect } from "@playwright/test";

/**
 * Conversion gate: "Get in touch" must land on the contact section.
 * A mailto: hero CTA is a fail — many phones have no mail handler, so the
 * primary hire button looks dead. A hash that updates the URL without
 * scrolling is also a fail (Next.js same-page hash).
 */
test.describe("Get in touch", () => {
  test("hero CTA is an in-page #contact link, not mailto", async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });
    const heroCta = page.locator("#home").getByRole("link", { name: "Get in touch" });
    await expect(heroCta).toBeVisible();
    await expect(heroCta).toHaveAttribute("href", "#contact");
  });

  test("clicking hero Get in touch scrolls the contact section into view", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "load" });
    await page.locator("#home").getByRole("link", { name: "Get in touch" }).click();
    await expect(page).toHaveURL(/#contact/);
    await expect(
      page.locator("#contact").getByRole("heading", { name: "Let's talk." }),
    ).toBeInViewport();
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
      "Contacting you from your website",
    );
    expect(parsed.searchParams.get("body")).toBe(
      "Contacting you from your website",
    );
  });
});

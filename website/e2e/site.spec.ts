import { expect, test } from "@playwright/test";

test.describe("SITE-003: content readable without WebGL and with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("SITE-003: every section is present and the static diagram replaces the 3D scene", async ({ page }) => {
    await page.addInitScript(() => {
      HTMLCanvasElement.prototype.getContext = () => null;
    });
    await page.goto("/en/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("The agent produces the work.");
    await expect(page.getByRole("img", { name: /verification core/i })).toBeVisible();
    await expect(page.getByTestId("hero-3d")).toHaveCount(0);
    for (const id of ["chain", "demo", "workflow", "regression", "verdicts", "boundaries", "install"]) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
    await expect(page.locator(".chain li").first()).toBeVisible();
    expect(await page.locator(".chain li").first().evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
  });

  test("SITE-003: no horizontal overflow", async ({ page }) => {
    await page.goto("/fr/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test.describe("SITE-001: the demonstration updates every panel together", () => {
  test("SITE-001: selecting scenarios changes verdict, terminal and explanation", async ({ page }) => {
    await page.goto("/en/");
    const verdict = page.getByTestId("verdict");
    await expect(verdict).toContainText("PASS");

    await page.getByRole("button", { name: /B —/ }).click();
    await expect(verdict).toContainText("FAIL");
    await expect(page.getByTestId("terminal")).toContainText("Unproven acceptance criteria");
    await expect(verdict).not.toContainText("PASS");

    await page.getByRole("button", { name: /C —/ }).click();
    await expect(verdict).toContainText("ERROR");
    await page.getByRole("button", { name: "Human judgment pending" }).click();
    await expect(verdict).toContainText("MANUAL");
    await page.getByRole("button", { name: /Simulate human attestation/ }).click();
    await expect(verdict).toContainText("ATTESTED");
  });
});

test("SITE-004: the language selector switches route and text", async ({ page }) => {
  await page.goto("/en/");
  await page.getByRole("link", { name: "FR" }).click();
  await expect(page).toHaveURL(/\/fr\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("L'agent produit le travail.");
});

test("SITE-003: the workflow stages are keyboard reachable", async ({ page }) => {
  await page.goto("/en/");
  await page.getByRole("tab", { name: /1\. SCOPING/ }).focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("tab", { name: /2\. EXPECTATION/ })).toHaveAttribute("aria-selected", "true");
});

import { test, expect } from "@playwright/test";
const { email, password } = require("../user.js");


test("authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").click();
  await page.screenshot({ path: "screenshots/login-page.png" });
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(password);
  await page.getByTestId("login-submit-btn").click();
  const titleText = await page.textContent("h2");
  await expect(
    page.getByRole("heading", { name: "Мои курсы и профессии" })
  ).toHaveText(titleText);
  await page.screenshot({
    path: "screenshots/profile.png",
    fullPage: true,
  });
});

test("invalid autorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");

  await page.getByPlaceholder("Email").click();
  await page.screenshot({
    path: "screenshots/login-page2.png",
  });
  await page.getByPlaceholder("Email").fill("test@mail.com");
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill("1qaz1qaz");
  await page.getByTestId("login-submit-btn").click();
  await expect(page.getByTestId("login-error-hint")).toHaveText(
    "Вы ввели неправильно логин или пароль"
  );
  await page.screenshot({
    path: "screenshots/invalid-loigin.png",
    fullPage: true,
  });
});

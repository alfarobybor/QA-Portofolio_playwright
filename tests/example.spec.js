const { test, expect } = require('../objects/Index');
const { validUser, loginErrorCases } = require('../data/LoginData');

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('login page shows its form elements', async ({ loginPage }) => {
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('valid user can log in', async ({ page, loginPage }) => {
    await loginPage.login(validUser);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByTestId('title')).toHaveText('Products');
  });

  // Data-driven: one test is generated for each case in data/loginData.js
  for (const c of loginErrorCases) {
    test(`login fails: ${c.title}`, async ({ page, loginPage }) => {
      await loginPage.login({ username: c.username, password: c.password });

      await expect(loginPage.errorMessage).toHaveText(c.expectedError);
      await expect(page).not.toHaveURL(/inventory\.html/);
    });
  }
});
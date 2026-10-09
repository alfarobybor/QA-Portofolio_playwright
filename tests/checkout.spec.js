// tests/checkout.spec.js
const { test, expect } = require('../objects/Index');
const { validUser } = require('../data/LoginData');
const { products } = require('../data/products');
const {
  validInfo,
  missingInfoCases,
  orderCompleteMessage,
} = require('../data/checkoutData');

test.describe('Checkout', () => {
  // Every test logs in, adds one product and arrives at the checkout form
  test.beforeEach(async ({ loginPage, inventoryPage, cartPage }) => {
    await loginPage.open();
    await loginPage.login(validUser);
    await inventoryPage.addToCart(products.backpack.slug);
    await inventoryPage.openCart();
    await cartPage.checkout();
  });

  test('user can complete a purchase end to end', async ({ page, checkoutPage }) => {
    await checkoutPage.submitInfo(validInfo);
    await expect(page).toHaveURL(/checkout-step-two\.html/);

    await checkoutPage.finish();
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(checkoutPage.completeHeader).toHaveText(orderCompleteMessage);
  });

  test('overview shows the chosen product', async ({ checkoutPage }) => {
    await checkoutPage.submitInfo(validInfo);

    await expect(checkoutPage.overviewItemNames).toHaveText([products.backpack.name]);
    await expect(checkoutPage.subtotalLabel).toContainText(
      `$${products.backpack.price.toFixed(2)}`
    );
  });

  // Data-driven: one test per case in data/checkoutData.js
  for (const c of missingInfoCases) {
    test(`checkout fails: ${c.title}`, async ({ page, checkoutPage }) => {
      await checkoutPage.submitInfo(c.info);

      await expect(checkoutPage.errorMessage).toHaveText(c.expectedError);
      await expect(page).toHaveURL(/checkout-step-one\.html/);
    });
  }
});

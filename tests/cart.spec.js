const { test, expect } = require('../objects/Index');
const { validUser } = require('../data/LoginData');
const { products } = require('../data/products');

test.describe('Cart', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(validUser);
  });

  test('added item appears in the cart', async ({ page, inventoryPage, cartPage }) => {
    await inventoryPage.addToCart(products.backpack.slug);
    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.itemNames).toHaveText([products.backpack.name]);
  });

  test('multiple added items appear in the cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCart(products.backpack.slug);
    await inventoryPage.addToCart(products.onesie.slug);
    await inventoryPage.openCart();

    await expect(cartPage.items).toHaveCount(2);
    await expect(cartPage.itemNames).toHaveText([
      products.backpack.name,
      products.onesie.name,
    ]);
  });

  test('item can be removed from the cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCart(products.backpack.slug);
    await inventoryPage.openCart();
    await cartPage.removeItem(products.backpack.slug);

    await expect(cartPage.items).toHaveCount(0);
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });

  test('continue shopping returns to the inventory page', async ({
    page,
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.openCart();
    await cartPage.continueShopping();

    await expect(page).toHaveURL(/inventory\.html/);
  });
});

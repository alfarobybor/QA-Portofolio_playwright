const { test, expect } = require('../objects/Index');
const { validUser } = require('../data/LoginData');
const { products, TOTAL_PRODUCTS } = require('../data/products');

test.describe('Inventory', () => {
  // Every test starts logged in on the inventory page
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(validUser);
  });

  test('shows all products', async ({ inventoryPage }) => {
    await expect(inventoryPage.title).toHaveText('Products');
    await expect(inventoryPage.items).toHaveCount(TOTAL_PRODUCTS);
  });

  test('adding one item updates the cart badge and button', async ({ inventoryPage }) => {
    await inventoryPage.addToCart(products.backpack.slug);

    await expect(inventoryPage.cartBadge).toHaveText('1');
    await expect(inventoryPage.removeButton(products.backpack.slug)).toBeVisible();
  });

  test('adding multiple items updates the cart badge count', async ({ inventoryPage }) => {
    await inventoryPage.addToCart(products.backpack.slug);
    await inventoryPage.addToCart(products.bikeLight.slug);
    await inventoryPage.addToCart(products.onesie.slug);

    await expect(inventoryPage.cartBadge).toHaveText('3');
  });

  test('removing an item clears the cart badge', async ({ inventoryPage }) => {
    await inventoryPage.addToCart(products.backpack.slug);
    await inventoryPage.removeFromCart(products.backpack.slug);

    await expect(inventoryPage.cartBadge).toHaveCount(0);
    await expect(inventoryPage.addButton(products.backpack.slug)).toBeVisible();
  });

  test('sort by price low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('lohi');

    const prices = await inventoryPage.getPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('sort by price high to low', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('hilo');

    const prices = await inventoryPage.getPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('sort by name A to Z', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('az');

    const names = await inventoryPage.getNames();
    expect(names).toEqual([...names].sort());
  });

  test('sort by name Z to A', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('za');

    const names = await inventoryPage.getNames();
    expect(names).toEqual([...names].sort().reverse());
  });
});

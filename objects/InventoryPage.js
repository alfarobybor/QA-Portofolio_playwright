// objects/InventoryPage.js
// Page Object for the products page (/inventory.html).

class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.title = page.getByTestId('title');
    this.items = page.getByTestId('inventory-item');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.itemPrices = page.getByTestId('inventory-item-price');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  // Buttons depend on the product, so they are built from the slug
  addButton(slug) {
    return this.page.getByTestId(`add-to-cart-${slug}`);
  }

  removeButton(slug) {
    return this.page.getByTestId(`remove-${slug}`);
  }

  async addToCart(slug) {
    await this.addButton(slug).click();
  }

  async removeFromCart(slug) {
    await this.removeButton(slug).click();
  }

  // option: 'az' | 'za' | 'lohi' | 'hilo'
  async sortBy(option) {
    await this.sortDropdown.selectOption(option);
  }

  async openCart() {
    await this.cartLink.click();
  }

  async getNames() {
    return this.itemNames.allTextContents();
  }

  // Returns prices as numbers, e.g. ['$29.99'] -> [29.99]
  async getPrices() {
    const texts = await this.itemPrices.allTextContents();
    return texts.map((t) => parseFloat(t.replace('$', '')));
  }
}

module.exports = { InventoryPage };

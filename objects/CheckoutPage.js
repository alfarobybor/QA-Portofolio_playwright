class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Step one: your information
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.errorMessage = page.getByTestId('error');

    // Step two: overview
    this.overviewItemNames = page.getByTestId('inventory-item-name');
    this.subtotalLabel = page.getByTestId('subtotal-label');
    this.finishButton = page.getByTestId('finish');

    // Complete
    this.completeHeader = page.getByTestId('complete-header');
  }

  async fillInfo({ firstName, lastName, postalCode }) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  // Fill the form and go to the overview in one call
  async submitInfo(info) {
    await this.fillInfo(info);
    await this.clickContinue();
  }

  async finish() {
    await this.finishButton.click();
  }
}

module.exports = { CheckoutPage };

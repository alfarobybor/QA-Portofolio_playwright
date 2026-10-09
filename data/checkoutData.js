// data/checkoutData.js
// Checkout form data and expected messages.

const validInfo = {
  firstName: 'John',
  lastName: 'Doe',
  postalCode: '12345',
};

// One test is generated per case in checkout.spec.js
const missingInfoCases = [
  {
    title: 'missing first name',
    info: { firstName: '', lastName: 'Doe', postalCode: '12345' },
    expectedError: 'Error: First Name is required',
  },
  {
    title: 'missing last name',
    info: { firstName: 'John', lastName: '', postalCode: '12345' },
    expectedError: 'Error: Last Name is required',
  },
  {
    title: 'missing postal code',
    info: { firstName: 'John', lastName: 'Doe', postalCode: '' },
    expectedError: 'Error: Postal Code is required',
  },
];

const orderCompleteMessage = 'Thank you for your order!';

module.exports = { validInfo, missingInfoCases, orderCompleteMessage };

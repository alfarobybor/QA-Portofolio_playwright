// data/loginData.js
// All login-related test data lives here. Tests import from this file,
// so changing a credential or message only needs to happen in one place.

// ---------- Positive ----------
const validUser = {
  username: 'standard_user',
  password: 'secret_sauce',
};

// ---------- Negative ----------
// Each case has a title (used as the test name), the credentials to type,
// and the error message expected in the banner.
const loginErrorCases = [
  {
    title: 'wrong password',
    username: 'standard_user',
    password: 'wrong_password',
    expectedError:
      'Epic sadface: Username and password do not match any user in this service',
  },
  {
    title: 'locked out user',
    username: 'locked_out_user',
    password: 'secret_sauce',
    expectedError: 'Epic sadface: Sorry, this user has been locked out.',
  },
  {
    title: 'empty username',
    username: '',
    password: 'secret_sauce',
    expectedError: 'Epic sadface: Username is required',
  },
  {
    title: 'empty password',
    username: 'standard_user',
    password: '',
    expectedError: 'Epic sadface: Password is required',
  },
];

module.exports = { validUser, loginErrorCases };
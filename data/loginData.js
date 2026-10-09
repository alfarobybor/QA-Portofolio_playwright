// ---------- Positive ----------
const validUser = {
  username: 'standard_user',
  password: 'secret_sauce',
};

// ---------- Negative ----------
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
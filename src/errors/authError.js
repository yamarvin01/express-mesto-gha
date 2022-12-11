const ERROR_CODE_AUTH = 401;

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthError';
    this.statusCode = ERROR_CODE_AUTH;
  }
}

module.exports = {
  AuthError,
};

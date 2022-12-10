const ERROR_CODE_VALIDATION = 400;
const ERROR_CODE_AUTH = 401;
const ERROR_CODE_NO_RIGHTS = 403;
const ERROR_CODE_NOTFOUND = 404;
const ERROR_CODE_DEFAULT = 500;

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

module.exports = {
  NotFoundError,
};

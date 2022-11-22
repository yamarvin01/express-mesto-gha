const ERROR_CODE_VALIDATION = 400;
const ERROR_CODE_NOTFOUND = 404;
const ERROR_CODE_DEFAULT = 500;

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = ERROR_CODE_VALIDATION;
  }
}

module.exports = {
  ERROR_CODE_VALIDATION,
  ERROR_CODE_NOTFOUND,
  ERROR_CODE_DEFAULT,
  NotFoundError,
};

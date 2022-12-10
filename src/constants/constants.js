/* eslint-disable max-classes-per-file */
const ERROR_CODE_VALIDATION = 400;
const ERROR_CODE_AUTH = 401;
const ERROR_CODE_NO_RIGHTS = 403;
const ERROR_CODE_NOTFOUND = 404;
const ERROR_CODE_DEFAULT = 500;

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.message = 'Переданы некорректные данные';
    this.statusCode = ERROR_CODE_VALIDATION;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.message = 'Запрашиваемая данные не найдены';
    this.statusCode = ERROR_CODE_NOTFOUND;
  }
}

module.exports = {
  ValidationError,
  NotFoundError,
};

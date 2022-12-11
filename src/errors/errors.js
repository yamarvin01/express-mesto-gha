/* eslint-disable max-classes-per-file */
const ERROR_CODE_NOTFOUND = 404;

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.message = 'Запрашиваемые данные не найдены';
    this.statusCode = ERROR_CODE_NOTFOUND;
  }
}

module.exports = {
  NotFoundError,
  ERROR_CODE_NOTFOUND,
};

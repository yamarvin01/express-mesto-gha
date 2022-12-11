const ERROR_CODE_DEFAULT = 500;

class DefaultError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.message = 'На сервере произошла ошибка';
    this.statusCode = ERROR_CODE_DEFAULT;
  }
}

module.exports = {
  ERROR_CODE_DEFAULT,
  DefaultError,
};

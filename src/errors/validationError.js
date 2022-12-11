const ERROR_CODE_VALIDATION = 400;

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.message = 'Переданы некорректные данные';
    this.statusCode = ERROR_CODE_VALIDATION;
  }
}

module.exports = {
  ValidationError,
};

const ERROR_CODE_VALIDATION = 400;
const ERROR_CODE_NOTFOUND = 404;
const ERROR_CODE_DEFAULT = 500;

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = ERROR_CODE_NOTFOUND;
  }
}

const setNotFoundError = (res, err) => res.status(err.statusCode).send({ message: `${err.message}` });
const setValidationError = (res) => {
  res
    .status(ERROR_CODE_VALIDATION)
    .send({ message: 'Переданы некорректные данные' });
};
const setDefaultError = (res) => res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка' });

const setErrorResponse = (res, err) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    setValidationError(res, err);
  }
  if (err.name === 'NotFoundError') {
    setNotFoundError(res, err);
  }
  setDefaultError(res);
};

module.exports = {
  NotFoundError,
  setNotFoundError,
  setValidationError,
  setDefaultError,
  setErrorResponse,
};

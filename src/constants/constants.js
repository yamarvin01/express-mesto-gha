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

const setNotFoundError = (res, err) => {
  return res.status(err.statusCode).send({ message: `${err.message}` });
};

const setValidationError = (res, err) => {
  res
    .status(ERROR_CODE_VALIDATION)
    .send({ message: `Переданы некорректные данные: ${err.message}` });
};

const setDefaultError = (res) => {
  return res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка' });
};

module.exports = {
  NotFoundError,
  setNotFoundError,
  setValidationError,
  setDefaultError,
};

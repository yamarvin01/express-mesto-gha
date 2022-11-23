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

const setErrorResponse = (res, err) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(ERROR_CODE_VALIDATION).send({ message: 'Переданы некорректные данные' });
  }
  if (err.name === 'NotFoundError') {
    return res.status(err.statusCode).send({ message: `${err.message}` });
  }
  return res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка' });
};

module.exports = {
  NotFoundError,
  setErrorResponse,
};

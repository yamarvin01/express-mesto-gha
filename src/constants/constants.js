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

const setErrorResponse = (res, err) => {
  if (err.name === 'NotFoundError') {
    return res.status(ERROR_CODE_NOTFOUND).send({ message: `${err.message}` });
  }
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(ERROR_CODE_VALIDATION).send({ message: 'Переданы некорректные данные' });
  }
  return res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка' });
};

module.exports = {
  NotFoundError,
  setErrorResponse,
};

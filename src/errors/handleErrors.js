const ERROR_CODE_DEFAULT = 500;

const handleErrors = (err, req, res, next) => {
  const { statusCode = ERROR_CODE_DEFAULT, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === ERROR_CODE_DEFAULT
        ? 'На сервере произошла ошибка'
        : message,
  });
  next();
};

const handleUncaughtException = (err, origin) => {
  console.log(`${origin} ${err.name} с текстов ${err.message} не была обработана!`);
};

module.exports = {
  handleErrors,
  handleUncaughtException,
};

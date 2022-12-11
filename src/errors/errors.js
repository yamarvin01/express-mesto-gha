/* eslint-disable max-classes-per-file */
const ERROR_CODE_NOTFOUND = 404;
const ERROR_CODE_PAGENOTFOUND = 404;
const ERROR_USER_EXIST = 409;
const ERROR_CODE_DEFAULT = 500;

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.message = 'Запрашиваемые данные не найдены';
    this.statusCode = ERROR_CODE_NOTFOUND;
  }
}

class PageNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PageNotFoundError';
    this.message = 'Страница по указанному маршруту не найдена';
    this.statusCode = ERROR_CODE_PAGENOTFOUND;
  }
}

class UserExistError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserExistError';
    this.message = 'Пользователь уже существует';
    this.statusCode = ERROR_USER_EXIST;
  }
}

module.exports = {
  NotFoundError,
  PageNotFoundError,
  UserExistError,
  ERROR_CODE_DEFAULT,
  ERROR_CODE_NOTFOUND,
};

/* eslint-disable max-classes-per-file */
const ERROR_CODE_VALIDATION = 400;
const ERROR_USER_EXIST = 400;
const ERROR_CODE_AUTH = 401;
const ERROR_CODE_NO_RIGHTS = 403;
const ERROR_CODE_NOTFOUND = 404;
const ERROR_CODE_DEFAULT = 500;

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthError';
    this.message = 'Не правильные почта или пароль';
    this.statusCode = ERROR_CODE_AUTH;
  }
}

class NoRightsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoRightsError';
    this.message = 'У вас не достаточно прав';
    this.statusCode = ERROR_CODE_NO_RIGHTS;
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

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.message = 'Запрашиваемые данные не найдены';
    this.statusCode = ERROR_CODE_NOTFOUND;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.message = 'Переданы некорректные данные';
    this.statusCode = ERROR_CODE_VALIDATION;
  }
}

module.exports = {
  AuthError,
  NoRightsError,
  NotFoundError,
  UserExistError,
  ValidationError,
  ERROR_CODE_AUTH,
  ERROR_CODE_DEFAULT,
  ERROR_CODE_NOTFOUND,
};

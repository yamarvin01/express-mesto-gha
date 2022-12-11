const ERROR_CODE_PAGENOTFOUND = 404;

class PageNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PageNotFoundError';
    this.message = 'Страница по указанному маршруту не найдена';
    this.statusCode = ERROR_CODE_PAGENOTFOUND;
  }
}

module.exports = {
  PageNotFoundError,
};

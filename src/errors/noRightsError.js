const ERROR_CODE_NO_RIGHTS = 403;

class NoRightsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoRightsError';
    this.message = 'У вас не достаточно прав';
    this.statusCode = ERROR_CODE_NO_RIGHTS;
  }
}

module.exports = {
  NoRightsError,
};

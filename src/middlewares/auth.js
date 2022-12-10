/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { ERROR_CODE_AUTH } = require('../errors/errors');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(ERROR_CODE_AUTH)
      .send({ message: 'Необходима авторизация' });
  }
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return res
      .status(ERROR_CODE_AUTH)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  next();
};

module.exports = auth;

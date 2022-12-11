/* eslint-disable object-curly-newline */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { UserExistError, ValidationError } = require('../errors/errors');

const signIn = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

const signUp = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then(() => {
      User.findOne({ email })
        .then((user) => {
          res.send(user);
        });
    })
    .catch((err) => {
      if (err.name === 'Error' || err.name === 'ValidationError') {
        throw new ValidationError();
      }
      if (err.name === 'MongoServerError') {
        throw new UserExistError();
      }
      next(err);
    })
    .catch(next);
};

module.exports = {
  signIn,
  signUp,
};

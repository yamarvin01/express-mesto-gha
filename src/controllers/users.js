/* eslint-disable no-param-reassign */
/* eslint-disable object-curly-newline */

// "email": "yamarvin01@yandex.ru",
// "password": "M@ssE11ectN07"
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzkyZDU5MThhNzI1NjQ5NDVhYmE3NDMiLCJpYXQiOjE2NzA1NjczMTgsImV4cCI6MTY3MTE3MjExOH0.dLN4UmVDF3XmxxADyIdn08e6XRjbtGE1lynWypdcmCs

// "email": "marina@yandex.ru",
// "password": "M@ssE11ectN07"
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzkzMmVkODFkZWVhZjQzOWYxMzkwNjMiLCJpYXQiOjE2NzA1OTI0NjgsImV4cCI6MTY3MTE5NzI2OH0.YpXs9CXNKXpV5V9ycGDPBfmjFKqG4-Lf2uXRlIVDB-k

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NotFoundError, setErrorResponse } = require('../constants/constants');

// Done
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      err.statusCode = 401;
      next(err);
    });
};

// Done
const getLoggedInUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .then((user) => res.send({ user }))
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find()
    .then((users) => res.send({ users }))
    .catch(next);
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .then((user) => res.send({ user }))
    .catch((err) => setErrorResponse(res, err));
};

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.send({ user }))
    .catch((err) => setErrorResponse(res, err));
};

const undateProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ user }))
    .catch((err) => setErrorResponse(res, err));
};

const undateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ user }))
    .catch((err) => setErrorResponse(res, err));
};

module.exports = {
  login,
  getLoggedInUser,
  getUsers,
  getUserById,
  createUser,
  undateProfile,
  undateAvatar,
};

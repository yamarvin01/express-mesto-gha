/* eslint-disable no-param-reassign */
/* eslint-disable object-curly-newline */

// "email": "yamarvin01@yandex.ru",
// "password": "M@ssE11ectN07"
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzkyZDU5MThhNzI1NjQ5NDVhYmE3NDMiLCJpYXQiOjE2NzA3MDAyMjYsImV4cCI6MTY3MTMwNTAyNn0.vx08lGVAcTaetCo3YSdjTJJk_TU9947KTH8u5JdX2MU

// "email": "marina@yandex.ru",
// "password": "M@ssE11ectN07"
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzkzMmVkODFkZWVhZjQzOWYxMzkwNjMiLCJpYXQiOjE2NzA1OTI0NjgsImV4cCI6MTY3MTE5NzI2OH0.YpXs9CXNKXpV5V9ycGDPBfmjFKqG4-Lf2uXRlIVDB-k

const User = require('../models/user');
const { ValidationError, NotFoundError } = require('../constants/constants');

const getLoggedInUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ user }))
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find()
    .then((users) => res.send({ users }))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError();
      }
      if (err.name === 'NotFoundError') {
        throw new NotFoundError();
      }
      next(err);
    })
    .catch(next);
};

const undateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError();
      }
      next(err);
    })
    .catch(next);
};

const undateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError();
      }
      next(err);
    })
    .catch(next);
};

module.exports = {
  getLoggedInUser,
  getUsers,
  getUserById,
  undateProfile,
  undateAvatar,
};

const User = require('../models/user');
const { NotFoundError } = require('../errors/notFoundError');
const { ValidationError } = require('../errors/validationError');

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
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError());
      } else {
        next(err);
      }
    });
};

const undateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError());
      } else {
        next(err);
      }
    });
};

const undateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError());
      } else {
        next(err);
      }
    });
};

module.exports = {
  getLoggedInUser,
  getUsers,
  getUserById,
  undateProfile,
  undateAvatar,
};

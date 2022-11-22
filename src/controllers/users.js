const User = require("../models/user");
const {
  ERROR_CODE_VALIDATION,
  ERROR_CODE_DEFAULT,
  NotFoundError,
} = require("../constants/constants");

const setValidationError = (res, err) => {
  res
    .status(ERROR_CODE_VALIDATION)
    .send({ message: `Переданы некорректные данные: ${err.message}` });
};

const setNotFoundError = (res, err) => {
  res
    .status(err.statusCode)
    .send({ message: `${err.message}` });
};

const setDefaultError = (res) => {
  return res
    .status(ERROR_CODE_DEFAULT)
    .send({ message: "Произошла ошибка" });
};

const getUsers = (req, res) => {
  User.find()
    .then((users) => res.send({ users }))
    .catch(() => setDefaultError(res));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === "CastError") {
        return setValidationError(res, err);
      }
      if (err.name === "NotFoundError") {
        return setNotFoundError(res, err);
      }
      return setDefaultError(res);
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return setValidationError(res, err);
      }
      return setDefaultError(res);
    });
};

const undateProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name: name, about: about },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return setValidationError(res, err);
      }
      return setDefaultError(res);
    });
};

const undateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return setValidationError(res, err);
      }
      return setDefaultError(res);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  undateProfile,
  undateAvatar,
};

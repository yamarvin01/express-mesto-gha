const User = require("../models/user");

const ERROR_CODE_VALIDATION = 400;
const ERROR_CODE_NOFFOUND = 404;
const ERROR_CODE_DEFAULT = 500;

const returnDefaultError = (res) => {
  return res.status(ERROR_CODE_DEFAULT).send({ message: "Произошла ошибка" });
};

const getUsers = (req, res) => {
  User.find()
    .then((users) => res.send({ users }))
    .catch(() => returnDefaultError(res));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODE_NOFFOUND)
          .send({ message: `Запрашиваемый пользователь не найден: ${err.message}` });
      }
      return returnDefaultError(res);
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_CODE_VALIDATION)
          .send({ message: `Переданы некорректные данные: ${err.message}` });
      }
      return returnDefaultError(res);
    });
};

const undateProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name: name, about: about },
    { runValidators: true }
  )
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_CODE_NOFFOUND)
          .send({ message: `Переданы некорректные данные: ${err.message}` });
      }
      return returnDefaultError(res);
    });
};

const undateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: avatar },
    { runValidators: true }
  )
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_CODE_NOFFOUND)
          .send({ message: `Переданы некорректные данные: ${err.message}` });
      }
      return returnDefaultError(res);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  undateProfile,
  undateAvatar,
};

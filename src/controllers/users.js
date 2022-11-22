const User = require("../models/user");

const ERROR_CODE_400 = 400; // переданы некорректные данные
const ERROR_CODE_404 = 404; // карточка или пользователь не найден
const ERROR_CODE_500 = 500; // ошибка по-умолчанию

const getUsers = (req, res) => {
  User.find()
    .then((users) =>
      res.send({ message: "Все пользователи получены", data: users })
    )
    .catch(() => res.status(500).send({ message: "Произошла ошибка!" }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ message: "Пользователь получен", data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: "Запрашиваемый пользователь не найден" })
      }
      return res.status(500).send({ message: "Произошла ошибка!" })
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ message: "Пользователь создан", data: user }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка!" }));
};

const undateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name: name, about: about })
    .then((user) =>
      res.send({
        message: "Пользователь обновлен, ниже старые данные",
        data: user,
      })
    )
    .catch(() => res.status(500).send({ message: "Произошла ошибка!" }));
};

const undateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar: avatar })
    .then((user) =>
      res.send({ message: "Аватар обновлен, ниже старые данные", data: user })
    )
    .catch(() => res.status(500).send({ message: "Произошла ошибка!" }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  undateProfile,
  undateAvatar,
};

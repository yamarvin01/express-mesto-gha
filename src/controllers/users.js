const User = require("../models/user");

const getUsers = (req, res) => {
  User.find()
    .then((users) => res.send({ message: "Все пользователи получены", data: users }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка!" }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ message: "Пользователь получен", data: user }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка!" }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ message: "Пользователь создан", data: user }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка!" }));
};

const updateUser = (req, res) => {

}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser
};

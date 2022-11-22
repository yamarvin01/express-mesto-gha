const User = require("../models/user");

const getUsers = (req, res) => {
  User.find()
    .then((users) => res.send({ users }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка!" }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(404)
          .send({ message: "Запрашиваемый пользователь не найден" });
      }
      return res.status(500).send({ message: "Произошла ошибка!" });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: `Переданы некорректные данные: ${err.message}` });
      }
      res.status(500).send({ message: "Произошла ошибка!" });
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
        return res.status(404).send({ message: `Переданы некорректные данные: ${err.message}` });
      }
      return res.status(500).send({ message: "Произошла ошибка!" });
    });
};

const undateAvatar = (req, res) => {
  const { avatar } = req.body;
  console.log(avatar);
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: avatar },
    { runValidators: true }
  )
    .then((user) => res.send({ user }))
    .catch((err) => {
      console.log(`ОШИБКА ${err.name}`);
      if (err.name === "ValidationError") {
        return res.status(404).send({ message: `Переданы некорректные данные: ${err.message}` });
      }
      return res.status(500).send({ message: "Произошла ошибка!" });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  undateProfile,
  undateAvatar,
};

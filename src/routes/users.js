const router = require('express').Router();
const User = require("../models/user");

// возвращает всех пользователей
router.get("/users", (req, res) => {
  User.find()
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: "Произошла ошибка!" }));
  console.log("GET-запрос отработал!");
});

// возвращает пользователя по _id
router.get("/users/:userId", (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send({data: user}))
    .catch(err => res.status(500).send({ message: "Произошла ошибка!" }));
  console.log("GET-запрос :userId отработал!");
});

// создаёт пользователя
router.post("/users", (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка!" }));
  console.log("POST-запрос отработал!");
});

module.exports = router;

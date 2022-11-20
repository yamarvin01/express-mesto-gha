console.log("Hello I am Node.js");

const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3000 } = process.env;
const fs = require("fs");
const path = require("path");

const bodyParser = require("body-parser");

const User = require("./src/models/user");
const Card = require("./src/models/card");

const app = express();

mongoose.connect(
  "mongodb://localhost:27017/mestodb",
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB!");
  }
);

// TODO: временное решение авторизации
app.use((req, res, next) => {
  req.user = {
    _id: '637a73f1aa4c15b86afe1d74'
  };

  next();
});

app.use(bodyParser.json());

// возвращает всех пользователей
app.get("/users", (req, res) => {
  console.log(req.user);
  User.find()
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: "Произошла ошибка!" }));
  console.log("GET-запрос отработал!");
});

// возвращает пользователя по _id
app.get("/users/:userId", (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send({data: user}))
    .catch(err => res.status(500).send({ message: "Произошла ошибка!" }));
  console.log("GET-запрос :userId отработал!");
});

// создаёт пользователя
app.post("/users", (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка!" }));
  console.log("POST-запрос отработал!");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

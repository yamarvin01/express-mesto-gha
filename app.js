const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3000 } = process.env;
const fs = require("fs");
const path = require("path");

const bodyParser = require("body-parser");

const Card = require("./src/models/card");

const userRoutes = require("./src/routes/users");

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
    _id: "637a73f1aa4c15b86afe1d74",
  };

  next();
});

app.use(bodyParser.json());
app.use("/", userRoutes);



// GET /cards — возвращает все карточки
app.get("/cards", (req, res) => {
  Card.find()
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка!" }));
});



// POST /cards — создаёт карточку
app.post("/cards", (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка!" }));
});

// DELETE /cards/:cardId — удаляет карточку по идентификатору
app.delete("/cards/:cardId", (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ message: "Карточка удалена", data: card }))
    .catch(() => res.send(500).send({ message: "Произошла ошибка!" }));
});



app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

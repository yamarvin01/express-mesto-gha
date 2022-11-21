const Card = require("../models/card");

const getCards = (req, res) => {
  Card.find()
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка!" }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ message: "Карточка добавлена", data: card }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка!" }));
};

const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ message: "Карточка удалена", data: card }))
    .catch(() => res.send(500).send({ message: "Произошла ошибка!" }));
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
};

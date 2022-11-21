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
  const cardId = req.params.cardId;
  Card.findByIdAndRemove(cardId)
    .then((card) => res.send({ message: "Карточка удалена", data: card }))
    .catch(() => res.send(500).send({ message: "Произошла ошибка!" }));
};

const addCardLikeById = (req, res) => {
  const userId = req.user._id;
  const cardId = req.params.cardId;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true } )
    .then(card => res.send({ message: "Карточке добавлен лайк, ниже старые данные", data: card }))
    .catch(() => res.send(500).send({ message: "Произошла ошибка!" }));
}

const deleteCardLikeById = (req, res) => {
  const userId = req.user._id;
  const cardId = req.params.cardId;
  Card.findByIdAndRemove(cardId, { $pull: { likes: userId } }, { new: true } )
    .then(card => res.send({ message: "Карточке добавлен лайк, ниже старые данные", data: card }))
    .catch(() => res.send(500).send({ message: "Произошла ошибка!" }));
}

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  addCardLikeById,
  deleteCardLikeById,
};

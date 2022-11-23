const Card = require('../models/card');
const {
  NotFoundError,
  setErrorResponse,
} = require('../constants/constants');

const getCards = (req, res) => {
  Card.find()
    .then((cards) => res.send({ cards }))
    .catch((err) => setErrorResponse(res, err));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch((err) => setErrorResponse(res, err));
};

const deleteCardById = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемая карта не найдена');
    })
    .then((card) => res.send({ card }))
    .catch((err) => setErrorResponse(res, err));
};

const addCardLikeById = (req, res) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .orFail(() => {
      throw new NotFoundError('Запрашиваемая карта не найдена');
    })
    .then((card) => res.send({ card }))
    .catch((err) => setErrorResponse(res, err));
};

const deleteCardLikeById = (req, res) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .orFail(() => {
      throw new NotFoundError('Запрашиваемая карта не найдена');
    })
    .then((card) => res.send({ card }))
    .catch((err) => setErrorResponse(res, err));
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  addCardLikeById,
  deleteCardLikeById,
};

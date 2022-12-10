/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */

const Card = require('../models/card');
const { NotFoundError } = require('../constants/constants');

const getCards = (req, res, next) => {
  Card.find()
    .then((cards) => res.send({ cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const e = new Error('Переданы некорректные данные');
        e.statusCode = 400;
        next(e);
      }
      next(err);
    });
};

const deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('');
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        const e = new Error('У вас не достаточно прав');
        e.statusCode = 403;
        next(e);
      }
      res.send({ card });
      card.remove();
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const e = new Error('Переданы не корректные данные');
        e.statusCode = 400;
        next(e);
      }
      if (err.name === 'NotFoundError') {
        const e = new Error('Запрашиваемая карта не найдена');
        e.statusCode = 404;
        next(e);
      }
      next(err);
    });
};

const addCardLikeById = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .orFail(() => {
      throw new NotFoundError('');
    })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        const e = new Error('Переданы некорректные данные');
        e.statusCode = 400;
        next(e);
      }
      if (err.name === 'NotFoundError') {
        const e = new Error('Запрашиваемая карта не найдена');
        e.statusCode = 404;
        next(e);
      }
      next(err);
    });
};

const deleteCardLikeById = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .orFail(() => {
      throw new NotFoundError('');
    })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        const e = new Error('Переданы некорректные данные');
        e.statusCode = 400;
        next(e);
      }
      if (err.name === 'NotFoundError') {
        const e = new Error('Запрашиваемая карта не найдена');
        e.statusCode = 404;
        next(e);
      }
      next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  addCardLikeById,
  deleteCardLikeById,
};

/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */

const Card = require('../models/card');
const { NotFoundError, setErrorResponse } = require('../constants/constants');

const getCards = (req, res) => {
  Card.find()
    .then((cards) => res.send({ cards }))
    .catch((err) => setErrorResponse(res, err));
};

// ValidationError
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        err.statusCode = 400;
        err.message = 'Переданы некорректные данные';
      }
      next(err);
    });
};

// CastError NotFoundError НеДостПрав
const deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемая карта не найдена');
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        const err = new Error('У вас не достаточно прав');
        err.statusCode = 403;
        next(err);
      }
      res.send({ card });
      card.remove();
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        err.statusCode = 400;
        err.message = 'Переданы некорректные данные';
      }
      if (err.name === 'NotFoundError') {
        err.statusCode = 404;
      }
      next(err);
    });
};

// CastError NotFoundError
const addCardLikeById = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .orFail(() => {
      throw new NotFoundError('Запрашиваемая карта не найдена');
    })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        err.statusCode = 400;
        err.message = 'Переданы некорректные данные';
      }
      if (err.name === 'NotFoundError') {
        err.statusCode = 404;
      }
      next(err);
    });
};

// CastError NotFoundError
const deleteCardLikeById = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .orFail(() => {
      throw new NotFoundError('Запрашиваемая карта не найдена');
    })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        err.statusCode = 400;
        err.message = 'Переданы некорректные данные';
      }
      if (err.name === 'NotFoundError') {
        err.statusCode = 404;
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

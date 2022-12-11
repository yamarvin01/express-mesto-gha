const Card = require('../models/card');
const { ValidationError, NotFoundError } = require('../errors/errors');
const { NoRightsError } = require('../errors/noRightsError');

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
        throw new ValidationError();
      }
      next(err);
    })
    .catch(next);
};

const deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new NoRightsError();
      }
      res.send({ card });
      card.remove();
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError();
      }
      if (err.name === 'NotFoundError') {
        next(err);
      }
      next(err);
    })
    .catch(next);
};

const addCardLikeById = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError();
      }
      if (err.name === 'NotFoundError') {
        next(err);
      }
      next(err);
    })
    .catch(next);
};

const deleteCardLikeById = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError();
      }
      if (err.name === 'NotFoundError') {
        next(err);
      }
      next(err);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  addCardLikeById,
  deleteCardLikeById,
};

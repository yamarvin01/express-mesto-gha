const Card = require('../models/card');
const { NoRightsError } = require('../errors/noRightsError');
const { NotFoundError } = require('../errors/notFoundError');
const { ValidationError } = require('../errors/validationError');

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
        next(new ValidationError());
      } else {
        next(err);
      }
    });
};

const deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Карта не найдена');
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new NoRightsError();
      }
      return card.remove()
        .then(() => res.send({ message: 'Карточка удалена', card }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError());
      } else {
        next(err);
      }
    });
};

const addCardLikeById = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .orFail(() => {
      throw new NotFoundError('Карта не найдена');
    })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError());
      } else {
        next(err);
      }
    });
};

const deleteCardLikeById = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .orFail(() => {
      throw new NotFoundError('Карта не найдена');
    })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError());
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  addCardLikeById,
  deleteCardLikeById,
};

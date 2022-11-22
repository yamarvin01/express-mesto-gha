const Card = require("../models/card");
const {
  NotFoundError,
  setNotFoundError,
  setValidationError,
  setDefaultError,
} = require("../constants/constants");

const getCards = (req, res) => {
  Card.find()
    .then((cards) => res.send({ cards }))
    .catch(() => setDefaultError(res));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return setValidationError(res, err);
      }
      return setDefaultError(res);
    });
};

const deleteCardById = (req, res) => {
  const cardId = req.params.cardId;
  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемая карта не найдена');
    })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === "NotFoundError" ) {
        return setNotFoundError(res, err);
      }
      if (err.name === "CastError") {
        return setValidationError(res, err);
      }
      return setDefaultError(res);
    });
};

const addCardLikeById = (req, res) => {
  const userId = req.user._id;
  const cardId = req.params.cardId;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError('Запрашиваемая карта не найдена');
    })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === "NotFoundError" ) {
        return setNotFoundError(res, err);
      }
      if (err.name === "CastError") {
        return setValidationError(res, err);
      }
      return setDefaultError(res);
    });
};

const deleteCardLikeById = (req, res) => {
  const userId = req.user._id;
  const cardId = req.params.cardId;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .orFail(() => {
      throw new NotFoundError('Запрашиваемая карта не найдена');
    })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === "NotFoundError" ) {
        return setNotFoundError(res, err);
      }
      if (err.name === "CastError") {
        return setValidationError(res, err);
      }
      return setDefaultError(res);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  addCardLikeById,
  deleteCardLikeById,
};

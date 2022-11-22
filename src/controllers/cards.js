const Card = require("../models/card");
const {
  ERROR_CODE_VALIDATION,
  ERROR_CODE_NOTFOUND,
  ERROR_CODE_DEFAULT,
  NotFoundError,
} = require("../constants/constants");

const setNotFoundError = (res, err) => {
  return res
    .status(err.statusCode)
    .send({ message: `${err.message}` });
};

const setDefaultError = (res) => {
  return res
    .status(ERROR_CODE_DEFAULT)
    .send({ message: "Произошла ошибка" });
};

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
        return res
          .status(ERROR_CODE_VALIDATION)
          .send({ message: `Переданы некорректные данные: ${err.message}` });
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
        return res
          .status(ERROR_CODE_NOTFOUND)
          .send({ message: `Запрашиваемая карта не найдена` });
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
        return res
          .status(ERROR_CODE_NOTFOUND)
          .send({ message: `Запрашиваемая карта не найдена` });
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
        return res
          .status(ERROR_CODE_NOTFOUND)
          .send({ message: `Запрашиваемая карта не найдена` });
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

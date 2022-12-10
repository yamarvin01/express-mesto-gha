/* eslint-disable no-useless-escape */
const router = require('express').Router();
const { celebrate, errors, Joi } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCardById,
  addCardLikeById,
  deleteCardLikeById,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/https?:\/\/(www\.)?[0-9a-zA-Z-]+\.[0-9a-zA-Z]+\/*[a-zA-Z0-9\/\-\_\.\+\(\)\[\]~:?#@!$&'*,;=]*#?/),
  }),
}), createCard);

router.delete('/cards/:cardId', deleteCardById);
router.put('/cards/:cardId/likes', addCardLikeById);
router.delete('/cards/:cardId/likes', deleteCardLikeById);

router.use(errors());

module.exports = router;

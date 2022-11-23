const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCardById,
  addCardLikeById,
  deleteCardLikeById,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCardById);
router.put('/cards/:cardId/likes', addCardLikeById);
router.delete('/cards/:cardId/likes', deleteCardLikeById);

module.exports = router;

/* eslint-disable no-useless-escape */
const router = require('express').Router();
const { celebrate, errors, Joi } = require('celebrate');
const {
  getLoggedInUser,
  getUsers,
  getUserById,
  undateProfile,
  undateAvatar,
} = require('../controllers/users');

router.get('/users/me', getLoggedInUser);

router.get('/users', getUsers);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), undateProfile);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/https?:\/\/(www\.)?[\w\-]+\.[\w\-]+\/*[\w\-\/\.\+\(\)\[\]~:?#@!$&'*,;=]*#?/),
  }),
}), undateAvatar);

router.use(errors());

module.exports = router;

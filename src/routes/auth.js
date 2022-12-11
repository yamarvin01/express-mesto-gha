/* eslint-disable no-useless-escape */
const router = require('express').Router();
const { celebrate, errors, Joi } = require('celebrate');
const { signIn, signUp } = require('../controllers/auth');

const emailRegExp = /[\w\-\_\.]+@[\w\-\_\.]+\.[\w\-\_\.]+/;

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().pattern(emailRegExp),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(/https?:\/\/(www\.)?[\w\-]+\.[\w\-]+\/*[\w\-\/\.\+\(\)\[\]~:?#@!$&'*,;=]*#?/),
    }),
  }),
  signUp,
);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().pattern(emailRegExp),
      password: Joi.string().required(),
    }),
  }),
  signIn,
);

router.use(errors());

module.exports = router;

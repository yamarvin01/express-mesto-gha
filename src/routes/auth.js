/* eslint-disable no-useless-escape */
const router = require('express').Router();
const { celebrate, errors, Joi } = require('celebrate');
const { signIn, signUp } = require('../controllers/auth');

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .required()
        .pattern(/[\w\-\_\.]+@[\w\-\_\.]+\.[\w\-\_\.]+/),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().min(2).max(30).pattern(/https?:\/\/(www\.)?[0-9a-zA-Z\-]+\.[0-9a-zA-Z]+\/*[a-zA-Z0-9\/\-\_\.\+\(\)\[\]~:?#@!$&'*,;=]*#?/),
    }),
  }),
  signUp,
);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .required()
        .pattern(/[\w\-\_\.]+@[\w\-\_\.]+\.[\w\-\_\.]+/),
      password: Joi.string().required(),
    }),
  }),
  signIn,
);

router.use(errors());

module.exports = router;

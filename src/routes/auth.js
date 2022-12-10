/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable no-useless-escape */
const router = require('express').Router();
const { celebrate, errors, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/users');

router.post('/signup', celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .required()
        .pattern(/[\w\-\_\.]+@[\w\-\_\.]+\.[\w\-\_\.]+/),
      password: Joi.string().required(),
    }),
  }), createUser);

router.post('/signin', celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .required()
        .pattern(/[\w\-\_\.]+@[\w\-\_\.]+\.[\w\-\_\.]+/),
      password: Joi.string().required(),
    }),
  }), login);

router.use(errors());

module.exports = router;

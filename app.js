/* eslint-disable no-unused-vars */
const express = require('express');
const mongoose = require('mongoose');
const process = require('process');

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const { ERROR_CODE_DEFAULT, ERROR_CODE_NOTFOUND } = require('./src/errors/errors');

const authRoutes = require('./src/routes/auth');
const cardRoutes = require('./src/routes/cards');
const userRoutes = require('./src/routes/users');

const auth = require('./src/middlewares/auth');

const app = express();

mongoose.connect(
  'mongodb://localhost:27017/mestodb',
  { useNewUrlParser: true },
  (err) => {
    if (err) throw err;
    console.log('Connected to MongoDB!');
  },
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', authRoutes);

app.use(auth);
app.use('/', userRoutes);
app.use('/', cardRoutes);

app.use((req, res) => {
  res.status(ERROR_CODE_NOTFOUND).send({
    message: 'Страница по указанному маршруту не найдена',
  });
});

process.on('uncaughtException', (err, origin) => {
  console.log(`${origin} ${err.name} с текстов ${err.message} не была обработана!`);
});

app.use((err, req, res, next) => {
  const { statusCode = ERROR_CODE_DEFAULT, message } = err;
  res.status(statusCode).send({
    message: statusCode === ERROR_CODE_DEFAULT
      ? 'На сервере произошла ошибка'
      : message,
  });
});

app.listen(PORT);

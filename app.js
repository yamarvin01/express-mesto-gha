const express = require('express');
const process = require('process');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { NotFoundError } = require('./src/errors/notFoundError');
const { handleErrors, handleUncaughtException } = require('./src/errors/handleErrors');

const authRoutes = require('./src/routes/auth');
const cardRoutes = require('./src/routes/cards');
const userRoutes = require('./src/routes/users');
const auth = require('./src/middlewares/auth');

const { requestLogger, errorLogger } = require('./src/middlewares/logger');

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
app.use(requestLogger);
app.use('/', authRoutes);
app.use(auth);
app.use('/', userRoutes);
app.use('/', cardRoutes);
app.use(errorLogger);
app.use(() => { throw new NotFoundError('Страница по указанному маршруту не найдена'); });
process.on('uncaughtException', handleUncaughtException);
app.use(errors());
app.use(handleErrors);

app.listen(PORT);

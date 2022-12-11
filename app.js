const express = require('express');
const mongoose = require('mongoose');
const process = require('process');

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { ERROR_CODE_DEFAULT } = require('./src/errors/defaultError');
const { NotFoundError } = require('./src/errors/notFoundError');
const { handleErrors } = require('./src/errors/handleErrors');

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
app.use(() => {
  throw new NotFoundError('Страница по указанному маршруту не найдена');
});

process.on('uncaughtException', (err, origin) => {
  console.log(`${origin} ${err.name} с текстов ${err.message} не была обработана!`);
});

app.use(errors());
app.use(handleErrors);

app.listen(PORT);

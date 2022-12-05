const express = require('express');
const mongoose = require('mongoose');
const process = require('process');

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const cardRoutes = require('./src/routes/cards');
const userRoutes = require('./src/routes/users');

const { login, createUser } = require('./src/controllers/users');
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

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);
app.use('/', userRoutes);
app.use('/', cardRoutes);

app.use((req, res) => {
  res.status(404).send({
    message: 'Страница по указанному маршруту не найдена',
  });
});

process.on('uncaughtException', (err, origin) => {
  console.log(`${origin} ${err.name} с текстов ${err.message} не была обработана!`);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

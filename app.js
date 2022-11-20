console.log("Hello I am Node.js");

const express = require("express");
const mongoose = require('mongoose');
const { PORT = 3000 } = process.env;
const fs = require("fs");
const path = require("path");

const User = require('./src/models/user');
const Card = require('./src/models/card');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true
}, err => {
  if(err) throw err;
  console.log('Connected to MongoDB!');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

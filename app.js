console.log("Hello I am Node.js");

const express = require("express");
const { PORT = 3000 } = process.env;
const fs = require("fs");
const path = require("path");

const app = express();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  // // TODO: временное решение авторизации 637a73f1aa4c15b86afe1d74
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: {
      type: [ { type: mongoose.Schema.Types.ObjectId, ref: "user" } ],
      default: [],
    },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);

const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Поле "name" должно быть заполнено'],
      minlength: [2, 'Поле "text" должно быть заполнено'],
      maxlength: [150, 'Поле "text" должно быть заполнено'],
    },
    active: {
      type: Boolean,
      default: false,
    },
    startedTime: {
      type: String,
      default: "",
    },
    endTime: {
      type: String,
      default: "",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model("task", cardSchema);

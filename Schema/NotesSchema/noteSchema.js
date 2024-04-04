const { Schema, model } = require("mongoose");

const noteSchema = new Schema({
  title: String,
  content: String,
  sharedWith: [String],
});

const noteModal = new model("notes", noteSchema);

module.exports = noteModal;

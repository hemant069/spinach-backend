const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  phoneno: Number,
  password: { type: String, required: true },
});

const userModel = new model("User", userSchema);

module.exports = userModel;

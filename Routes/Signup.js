// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// impo
// const router = express.Router();

const bcrypt = require("bcrypt");
const express = require("express");
const userModel = require("../Schema/UserSchema/userSchema.js");

const router = express.Router();

router.post("/", async (req, res) => {
  const { firstname, lastname, phoneno, email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user) {
    res.json({ msg: "user is already exists please login" });
  } else {
    bcrypt.hash(password, 8, async (err, hash) => {
      if (err) {
        return res.status(401).send({ err: "Something went Wrong" });
      }
      const signup = await userModel({
        firstname,
        lastname,
        phoneno,
        email,
        password: hash,
      });

      signup.save();

      return res.status(201).json({ msg: "user created successfully", signup });
    });
  }
});

module.exports = router;

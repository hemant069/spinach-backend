const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../Schema/UserSchema/userSchema.js");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email: email });

  if (user == null) {
    return res.status(401).json({ msg: "Please correct your email" });
  } else {
    const hash = user?.password;

    bcrypt.compare(password, hash, (err, result) => {
      if (err) {
        return res.status(401).json({ msg: "Something went wrong" });
      }
      if (result) {
        const token = jwt.sign(
          { userId: user._id, password: user.password },
          "SECRET",
          { expiresIn: "1h" }
        );
        return res.status(201).json({ msg: "Loggin Success", token });
      } else {
        return res.status(401).json({ msg: "Wrong Password" });
      }
    });
  }
});

module.exports = router;

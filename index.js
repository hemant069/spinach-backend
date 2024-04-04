const express = require("express");
const signup = require("./Routes/Signup.js");
const login = require("./Routes/Login.js");
const note = require("./Routes/Note.js");
const search = require("./Routes/Search.js");
const connectDB = require("./config/db.js");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => res.send("hello world"));

app.use("/api/auth/signup", signup);
app.use("/api/auth/login", login);
app.use("/api/notes", note);
app.use("/api/search", search);
connectDB();
app.listen(8080, () => {
  console.log("server started on port 8080");
});

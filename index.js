const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const db = require("./db/connect");
const User = require("./db/models/Users");
const sendMail = require("./mail");
const bcrypt = require("bcrypt");
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public")));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.get("/", function (req, res) {
  res.set({
    "Access-control-Allow-Origin": "*",
  });
  return res.redirect("index.html");
});

app.post("/add", async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, password } = req.body;
    var salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = await User.create({
      name: name,
      email: email,
      password: hash,
    });

    sendMail(name, email);
    // res.status(200).json({
    //   message: "email sent successfully ",
    // });
    res.redirect("/code.html");
  } catch (error) {
    console.log(error);
  }
});

app.post("/verify", (req, res) => {
  const { code } = req.body;
  // console.log(code);
  if (code == 121) {
    res.status(200).json({
      message: "verified successfully",
    });
  } else {
    res.status(400).json({
      message: "code is incorrect",
    });
  }
});

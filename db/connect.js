const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const db = mongoose.connect(
  `mongodb+srv://adipadi:${process.env.password}@ecommerceweb.g1kj4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("connection", () => {
  console.log("MongoDB connected");
});

module.exports = db;

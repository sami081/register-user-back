// db.js
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://sami:sami1987@crud.dndehun.mongodb.net/database",
  {}
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;

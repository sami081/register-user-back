//pour le dev
const mongoose = require("mongoose");
console.log("Attempting to connect to MongoDB");

mongoose.connect(
  "mongodb+srv://sami:sami1987@crud.dndehun.mongodb.net/database",
  {}
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB/database");
});

module.exports = db;
//pour les test
// const mongoose = require('mongoose');

// const connectToDatabase = async () => {
//   try {
//     console.log('Attempting to connect to MongoDB...');
//     await mongoose.connect('mongodb+srv://sami:sami1987@crud.dndehun.mongodb.net/database', {
     
//     });
//     console.log('Connected to MongoDB/database');
//   } catch (error) {
//     console.error('Database connection error:', error);
//     throw error;  // Propagate the error to fail the tests
//   }
// };

// module.exports = connectToDatabase;

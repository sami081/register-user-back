require('dotenv').config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const {
  createUser,
  getAllUsers,
  modifyUser,
  deleteUser,
  getOneUser
} = require("./controllers/userControllers");

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "https://register-wo5f.vercel.app", // Remplacez par l'URL de votre frontend
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

// Middleware to add headers for CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://register-wo5f.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.post("/users", createUser);
app.get("/users", getAllUsers);
app.get("/users/:id", getOneUser); 
app.put("/users/:id", modifyUser);
app.delete("/users/:id", deleteUser);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };

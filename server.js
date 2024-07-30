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
  optionsSuccessStatus: 204,
  preflightContinue: false,
};

app.use(cors(corsOptions));

// Répondre aux requêtes préflight (OPTIONS) pour toutes les routes
app.options("*", cors(corsOptions));

// Les routes de votre application
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

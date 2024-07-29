require('dotenv').config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const {
  createUser,
  getAllUsers,
  modifyUser,
  deleteUser,
} = require("./controllers/userControllers");

const app = express();
connectDB();  // Appel de la fonction pour se connecter à MongoDB

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "https://register-g136r6fuw-sami081s-projects.vercel.app/",
  methods: ["GET,POST,PUT,DELETE"],
  allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
  credentials: true // Permet les informations d'identification
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post("/users", createUser);
app.get("/users", getAllUsers);
app.put("/users/:id", modifyUser);
app.delete("/users/:id", deleteUser);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

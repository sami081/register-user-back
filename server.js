require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const {
  createUser,
  getAllUsers,
  modifyUser,
  deleteUser,
  getOneUser,
} = require("./controllers/userControllers");

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "https://register-wo5f.vercel.app" || "https://register-sami081-sami081s-projects.vercel.app", // Remplacez par l'URL de votre frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));

// Répondre explicitement aux requêtes préflight (OPTIONS)


// Les routes de votre application
app.post("/users", createUser);
app.get("/users", getAllUsers);
app.get("/users/:id", getOneUser);
app.put("/users/:id", modifyUser);
app.delete("/users/:id", deleteUser);

const PORT = process.env.PORT || 5000;

// Assurez-vous d'exporter le serveur correctement
module.exports = app;

// Démarrez le serveur uniquement si ce script est exécuté directement (pas lors de l'importation)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

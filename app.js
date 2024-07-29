// // app.js
// const express = require("express");
// const cors = require("cors");
// const {
//   createUser,
//   getAllUsers,
//   modifyUser,
//   deleteUser,
// } = require("./controllers/userControllers");

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const corsOptions = {
//   origin: "http://localhost:3000",
//   methods: "GET,POST,PUT,DELETE", // Méthodes HTTP autorisées
//   allowedHeaders: "Content-Type,Authorization", // En-têtes autorisés
// };

// app.use(cors(corsOptions)); // Utiliser les options CORS

// app.post("/users", createUser);
// app.get("/users", getAllUsers);
// app.put("/users/:id", modifyUser);
// app.delete("/users/:id", deleteUser);

// module.exports = app;

// server.js
const express = require('express');
const db = require('./config/db');
const cors = require('cors');
const { createUser, getAllUsers, modifyUser } = require('./controllers/userControllers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Optionnel: Configurer CORS pour des origines spécifiques

const corsOptions = {
  origin: 'https://client-list-rose.vercel.app', // Autoriser uniquement ce domaine
  methods: 'GET,POST,PUT,DELETE', // Méthodes HTTP autorisées
  allowedHeaders: 'Content-Type,Authorization', // En-têtes autorisés
};

app.use(cors(corsOptions)); // Utiliser les options CORS


app.post('/users', createUser);
app.get('/users', getAllUsers);
app.put('/:id', modifyUser);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

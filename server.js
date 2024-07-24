// server.js
const express = require('express');
const db = require('./config/db');
const cors = require('cors');
const { createUser, getAllUsers } = require('./controllers/userControllers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Optionnel: Configurer CORS pour des origines spécifiques

const corsOptions = {
  origin: 'https://client-list-rose.vercel.app/', // Remplacez par l'URL de votre frontend
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));


app.post('/users', createUser);
app.get('/users', getAllUsers);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

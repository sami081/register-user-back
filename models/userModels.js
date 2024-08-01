// userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  surname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    
  },
  phone: {
    type: String,
    required: true,
  
  },

  dateOfBirth: {
    type: Date,
    required: true,
  },
  adressNumber: {
    type: String,
    required: true,
  },
  addressType: {
    type: String,
    enum: ['Rue', 'Impasse', 'Allée', 'Avenue', 'Boulevard', 'Voie'], // Liste des options possibles
    required: true,
  },
  adressName: {
    type: String,
    required: true,
  },

  ZIPCode: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required : true
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

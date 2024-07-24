const User = require("../models/userModels");
const validator = require("validator");

const createUser = async (req, res) => {
  try {
    const { surname, firstname, email, phone, dateOfBirth } = req.body;
  

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    const newUser = new User({
      surname,
      firstname,
      email,
      phone,
     
      dateOfBirth,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const modifyUser = async (req, res)=> {
    try {
      const { id } = req.params;
      const { surname, firstname, email, phone, dateOfBirth } = req.body;
  
      // Trouver et mettre à jour l'utilisateur
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { surname, firstname, email, phone, dateOfBirth },
        { new: true, runValidators: true }
      );
  
      // Vérifier si l'utilisateur existe
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

module.exports = { createUser, getAllUsers, modifyUser };

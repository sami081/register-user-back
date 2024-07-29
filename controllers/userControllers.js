const User = require("../models/userModels");
const validator = require("validator");

const createUser = async (req, res) => {
  try {
    const { surname, firstname, email, phone, dateOfBirth } = req.body;
  

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    if (!firstname || !surname || !email || !phone || !dateOfBirth) {
      return res.status(400).json({ error: "All fields are required" });
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
  const modifyUser = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(id, updateData, { new: true });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error: error.message });
    }
  };

  // delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};


module.exports = { createUser, getAllUsers, modifyUser, deleteUser};

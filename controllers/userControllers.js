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

module.exports = { createUser, getAllUsers };

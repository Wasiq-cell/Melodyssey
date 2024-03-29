const express = require("express");
const router = express.Router();
const User = require('../models/User');
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers");

router.post("/register", async (req, res) => {
  try {
    const { email, password, firstName, lastName, username } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).json({ error: "A user with this email already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUserData = { email, password: hashPassword, firstName, lastName, username };
    const newUser = await User.create(newUserData);

    const token = await getToken(email, newUser);

    const userToReturn = { ...newUser.toJSON(), token };
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
  } catch (error) {
    console.error("Registration failed:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({ err: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ err: "Invalid credentials" });
    }

    const token = await getToken(user.email, user);
    const userToReturn = { ...user.toJSON(), token };
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
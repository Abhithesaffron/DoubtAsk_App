const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  console.log(email , password);
  try {
    const existingUser = await User.findOne({ userEmail : email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userEmail: email, userPassword: hashedPassword, isAdmin: false });
    // console.log(newUser);
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ userEmail : email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.userPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create a token with user info and isAdmin flag
    const token = jwt.sign({ userId: user.userId, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '8h' });

    // Send both the token and isAdmin flag
    res.status(200).json({ message: 'Login successful', token, isAdmin: user.isAdmin , userName: user.userEmail , userId : user.userId });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

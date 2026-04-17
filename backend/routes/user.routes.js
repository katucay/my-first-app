import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// 🔐 GENERATE TOKEN
const generateToken = (id) => {
  return jwt.sign({ id }, 'SECRET_KEY', {
    expiresIn: '30d'
  });
};

// ✅ REGISTER
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // CHECK FIELDS
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // CHECK EXISTING EMAIL
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'user'
    });

    // GENERATE TOKEN
    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Server error'
    });
  }
});

export default router;
// 🌟 Auth Controller - By Yogender
const User = require('../models/user.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../utils/token');

// 📝 Register
exports.register = async (req, res) => {
  try {
    const { username, email, phone, password, confirmPassword, role } = req.body;

    if (!username || !email || !phone || !password || !confirmPassword || !role) {
      return res.status(400).json({ status: 'fail', message: 'Sab fields bharna zaroori hai 📝' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ status: 'fail', message: 'Passwords match nahi karte ❌' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ status: 'fail', message: 'Ye email already registered hai 🚫' });
    }

    const newUser = new User({ username, email, phone, password, confirmPassword, role });
    await newUser.save();

    return res.status(201).json({
      status: 'success',
      message: 'Registration successful 🎉',
      data: { userId: newUser._id, username, email, phone, role },
    });

  } catch (err) {
    console.error('❌ Registration Error:', err.message);
    return res.status(500).json({ status: 'error', message: 'Server ka mood off hai 😔' });
  }
};

// 🔐 Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: 'fail', message: 'Email aur password chahiye bro 🔑' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ status: 'fail', message: 'Galat email ya password ❌' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Login successful 🎉',
      data: { accessToken, userId: user._id, username: user.username, email, role: user.role },
    });

  } catch (err) {
    console.error('❌ Login Error:', err.message);
    return res.status(500).json({ status: 'error', message: 'Server ki taraf se kuch garbar hai 🔧' });
  }
};

// 🔄 Refresh Token
exports.refreshToken = (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(403).json({ status: 'fail', message: 'Refresh token missing 🚫' });
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ status: 'fail', message: 'Refresh token invalid ❌' });
      }

      const newAccessToken = generateAccessToken({ _id: decoded.id, role: decoded.role });
      return res.status(200).json({
        status: 'success',
        message: 'Naya Access Token ready 🚀',
        data: { accessToken: newAccessToken },
      });
    });

  } catch (error) {
    console.error('❌ Refresh Token Error:', error.message);
    return res.status(500).json({ status: 'error', message: 'Token refresh karte waqt dikkat aayi 😔' });
  }
};

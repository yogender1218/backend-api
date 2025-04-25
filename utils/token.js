const jwt = require('jsonwebtoken');

// Token create karne ke liye function
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' } // 15 minutes ka token, short life
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' } // 7 din ka refresh token
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};

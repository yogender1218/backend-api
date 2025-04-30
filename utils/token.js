const jwt = require('jsonwebtoken');

// Token create function
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '45m' } // 45 minutes token, short life
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },  
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' } // 7 days refresh token
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};

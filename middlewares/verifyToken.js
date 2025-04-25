const jwt = require('jsonwebtoken');

// Access token verify karne ka middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token invalid ya expire ho gaya ⏳' });
      }
      req.user = user; // User data ko request me chipka diya
      next(); // Next middleware ya controller me jao
    });
  } else {
    return res.status(401).json({ message: 'Authorization token missing 🧨' });
  }
};

module.exports = verifyToken;

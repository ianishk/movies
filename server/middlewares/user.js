
const jwt = require('jsonwebtoken');

const user = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) res.user = null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    res.user = null;
  }
  next();
};
module.exports = user;
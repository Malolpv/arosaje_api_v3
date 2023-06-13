const jwt = require("jsonwebtoken");

const jwt_secret = process.env.JWT_SECRET

function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    is_botaniste: user.is_botaniste
  };

  return jwt.sign(payload, jwt_secret, { expiresIn: "1h" })
}

function verifyToken(token) {
  return jwt.verify(token, jwt_secret)
}

module.exports = {
  generateToken,
  verifyToken
}
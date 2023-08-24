require('dotenv').config()

const jwt = require("jsonwebtoken")

const jwt_secret = process.env.JWT_SECRET

/**
 * Generate a jwt token based on given user id, email and role.
 * The token is valid for 1 hour.
 * @param {object} user 
 * @returns The JSON Web Token string 
 */
const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    is_botaniste: user.is_botaniste
  };

  return jwt.sign(payload, jwt_secret, { expiresIn: "1h" })
}

/**
 * Utility function to verify the given token, using jsonwebtoken.verify()
 * @param {string} token 
 * @returns the decoded token
 */
const verifyToken = (token) => {
  return jwt.verify(token, jwt_secret)
}

module.exports = {
  generateToken,
  verifyToken
}
const bcrypt = require("bcrypt");
const { createUser, emailExist } = require('../services/user');
const { generateToken } = require("../utils/jwt");
const { CONFLICT, INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED, BAD_REQUEST } = require("../utils/http_status");

require('../utils/http_status')

const register = async (req, res) => {
  try {
    const { pseudo, email, password, is_botaniste } = req.body
    
    // empty / invalid payload 
    if (!email || !pseudo || !password || typeof is_botaniste !== 'boolean') {
      return res.status(BAD_REQUEST).json('Aucun champ ne doit être vide')
    }

    // email is invalid
    if(!new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(email.trim())){
      return res.status(UNAUTHORIZED).json("L'email doit être valide")
    }

    // Check if the email already exists
    const existingUser = await emailExist(email)
    if (existingUser) {
      return res.status(CONFLICT).json({ message: "Un compte existe déjà pour cet email" })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new user
    const user = await createUser({ pseudo: pseudo, email: email, password: hashedPassword, is_botaniste: is_botaniste })

    // Generate JWT token
    const token = generateToken(user)

    res.status(OK).json({ token })
  } catch (error) {
    console.error(error)
    res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal server error" })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const invalid_mail_or_pass = "Email ou mot de passe invalide"

    if (email && password) {
      // Check if the email exists
      const user = await emailExist(email);
      if (!user) {
        return res.status(UNAUTHORIZED).json({ message: invalid_mail_or_pass })
      }

      // Compare the password
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return res.status(UNAUTHORIZED).json({ message: invalid_mail_or_pass })
      }

      // Generate JWT token
      const token = generateToken(user)

      res.status(OK).json({ token })
    } else {
      // email ou mot de passe vide
      res.status(BAD_REQUEST).json(invalid_mail_or_pass)
    }
  } catch (error) {
    console.error(error)
    res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal server error" })
  }
}

module.exports = {
  register,
  login
}
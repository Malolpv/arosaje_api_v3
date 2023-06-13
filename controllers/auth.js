const bcrypt = require("bcrypt");
const {createUser, emailExist} = require('../services/user');
const { generateToken } = require("../utils/jwt");

const register = async (req, res) => {
    try {
      const { pseudo, email, password, is_botaniste } = req.body
  
      // Check if the email already exists
      const existingUser = await emailExist(email)
      if (existingUser) {
        return res.status(409).json({error: "An account already exist for this email"})
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10)
  
      // Create a new user
      const user = await createUser({pseudo: pseudo, email: email, password: hashedPassword, is_botaniste: is_botaniste})
      
      res.status(201).json(user)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal server error" })
    }
}

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the email exists
      const user = await emailExist(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" })
      }
  
      // Compare the password
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid username or password" })
      }
  
      // Generate JWT token
      const token = generateToken(user)
  
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
}

module.exports={
    register,
    login
}
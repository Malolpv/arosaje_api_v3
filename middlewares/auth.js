const { verifyToken } = require("./jwtUtils") 

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization 

  if (authHeader) {
    const token = authHeader.split(" ")[1] 

    try {
      const decoded = verifyToken(token) 
      req.user = decoded 
      next() 
    } catch (err) {
      res.status(403).json({ error: "INVALID_TOKEN" }) 
    }
  } else {
    res.status(401).json({ error: "MISSING_TOKEN" }) 
  }
}

module.exports = authMiddleware 
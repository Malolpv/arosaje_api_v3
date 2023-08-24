const { UNAUTHORIZED, FORBIDDEN } = require('../utils/http_status')
const { verifyToken } = require('../utils/jwt') 
require('../utils/http_status')

/**
 * Check if the token contained in request Authorization header is valid.
 * If the token is missing, set the response to 401.
 * If the token is invalid, set the response to 403.
 * Else execute the callback function.
 * @param {*} req The handled htpp request
 * @param {*} res Server response
 * @param {*} next Callback function
 */
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization 
    
    if (authHeader) {
        const token = authHeader.split(' ')[1] 

        try {
        const decoded = verifyToken(token) 
        req.user = decoded 
        next() 
        } catch (error) {
            console.error(error)
            res.status(FORBIDDEN).json({ error: "INVALID_TOKEN" }) 
        }
    } else {
    res.status(UNAUTHORIZED).json({ error: "MISSING_TOKEN" }) 
    }
}

module.exports = authMiddleware 
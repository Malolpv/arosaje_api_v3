const {Router} = require('express')
const {register, login} = require('../controllers/auth')


exports.authRoutes = () => {
    const router = Router()

    // login route 
    router.post('/login',login)

    //register route
    router.post('/register',register)

    return router
}

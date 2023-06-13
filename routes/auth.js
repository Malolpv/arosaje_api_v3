const {Router} = require('express')
const {register, login} = require('../controllers/auth')


exports.authRoutes = () => {
    const router = Router()

    // get all users 
    router.get('/login',login)

    //get user by id
    router.get('/register',register)

    return router
}

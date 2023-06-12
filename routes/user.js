const {Router} = require('express')
const {getUser, getUsers, deleteUser, postUser, patchUser} = require('../controllers/user')


exports.usersRoutes = () => {
    const router = Router()

    // get all users 
    router.get('/',getUsers)

    //get user by id
    router.get('/:id',getUser)

    //create user
    router.post('/',postUser)

    //update user
    router.patch('/:id',patchUser)

    //delete user
    router.delete('/:id',deleteUser)

    return router
}

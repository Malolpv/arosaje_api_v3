const {Router} = require('express')
const {getUser, getUsers, deleteUser, patchUser, getUserGardens, postUserGarden} = require('../controllers/user')
const authMiddleware = require('../middlewares/auth')


exports.usersRoutes = () => {
    const router = Router()

    // get all users 
    router.get('/', getUsers)

    //get user by id
    router.get('/:id', getUser)

    //get user gardens
    router.get('/:id/gardens', authMiddleware,getUserGardens)

    //create user garden
    router.post('/:id/gardens', authMiddleware,postUserGarden)

    //update user
    router.patch('/:id', authMiddleware,patchUser)

    //delete user
    router.delete('/:id', authMiddleware,deleteUser)

    return router
}

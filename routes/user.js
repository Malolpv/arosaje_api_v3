const {Router} = require('express')
const {getUser, getUsers, deleteUser, patchUser, getUserGardens, postUserGarden} = require('../controllers/user')


exports.usersRoutes = () => {
    const router = Router()

    // get all users 
    router.get('/',getUsers)

    //get user by id
    router.get('/:id',getUser)

    //get user gardens
    router.get('/:id/gardens',getUserGardens)

    //create user garden
    router.post('/:id',postUserGarden)

    //update user
    router.patch('/:id',patchUser)

    //delete user
    router.delete('/:id',deleteUser)

    return router
}

const {Router} = require('express')
const {getPicture, deletePicture, patchPicture} = require('../controllers/picture')
const authMiddleware = require('../middlewares/auth')


exports.picturesRoutes = () => {
    const router = Router()

    //get picture by id
    router.get('/:id', authMiddleware, getPicture)

    //update picture
    router.patch('/:id', authMiddleware, patchPicture)

    //delete picture
    router.delete('/:id', authMiddleware, deletePicture)

    return router
}

const {Router} = require('express')
const {getPicture, deletePicture} = require('../controllers/picture')
const authMiddleware = require('../middlewares/auth')
const { checkPictureOwnership } = require('../middlewares/ownership')


exports.picturesRoutes = () => {
    const router = Router()

    //get picture by id
    router.get('/:id', authMiddleware, getPicture)

    //delete picture
    router.delete('/:id', authMiddleware, checkPictureOwnership, deletePicture)

    return router
}

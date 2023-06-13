const {Router} = require('express')
const {getPicture, deletePicture, patchPicture} = require('../controllers/picture')


exports.picturesRoutes = () => {
    const router = Router()

    //get picture by id
    router.get('/:id',getPicture)

    //update picture
    router.patch('/:id',patchPicture)

    //delete picture
    router.delete('/:id',deletePicture)

    return router
}

const {Router} = require('express')
const {getAdvice, deleteAdvice, patchAdvice} = require('../controllers/advice')


exports.advicesRoutes = () => {
    const router = Router()

    //get advice by id
    router.get('/:id',getAdvice)

    //update advice
    router.patch('/:id',patchAdvice)

    //delete advice
    router.delete('/:id',deleteAdvice)

    return router
}

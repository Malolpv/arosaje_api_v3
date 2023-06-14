const {Router} = require('express')
const {getAdvice, deleteAdvice} = require('../controllers/advice')
const { checkAdviceOwnership } = require('../middlewares/ownership')
const authMiddleware = require('../middlewares/auth')


exports.advicesRoutes = () => {
    const router = Router()

    //get advice by id
    router.get('/:id',getAdvice)

    //delete advice
    router.delete('/:id', authMiddleware ,checkAdviceOwnership,deleteAdvice)

    return router
}

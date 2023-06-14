const {Router} = require('express')
const {getPlant, getPlants, deletePlant, postPlant, patchPlant, getPlantPictures, getPlantAdvices, postPlantPicture, postPlantAdvice} = require('../controllers/plant')
const authMiddleware = require('../middlewares/auth')


exports.plantsRoutes = () => {
    const router = Router()

    // get all plants 
    router.get('/', authMiddleware, getPlants)

    //get plant by id
    router.get('/:id', authMiddleware, getPlant)

    //get picture by blant id
    router.get('/:id', authMiddleware, getPlantPictures)

    //get advice by plant id
    router.get('/:id', authMiddleware, getPlantAdvices)

    //create picture for plant
    router.post('/:id/pictures', authMiddleware, postPlantPicture)
    
    //create picture for plant
    router.post('/:id/advices', authMiddleware, postPlantAdvice)

    //update plant
    router.patch('/:id', authMiddleware,patchPlant)

    //delete plant
    router.delete('/:id', authMiddleware,deletePlant)

    return router
}

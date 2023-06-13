const {Router} = require('express')
const {getPlant, getPlants, deletePlant, postPlant, patchPlant, getPlantPictures, getPlantAdvices, postPlantPicture, postPlantAdvice} = require('../controllers/plant')


exports.plantsRoutes = () => {
    const router = Router()

    // get all plants 
    router.get('/',getPlants)

    //get plant by id
    router.get('/:id',getPlant)

    //get picture by blant id
    router.get('/:id',getPlantPictures)

    //get advice by plant id
    router.get('/:id',getPlantAdvices)

    //create picture for plant
    router.post('/:id/pictures',postPlantPicture)
    
    //create picture for plant
    router.post('/:id/advices',postPlantAdvice)

    //update plant
    router.patch('/:id',patchPlant)

    //delete plant
    router.delete('/:id',deletePlant)

    return router
}

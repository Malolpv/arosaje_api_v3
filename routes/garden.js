const {Router} = require('express')
const {getGarden, getGardens, deleteGarden, postGarden, patchGarden, getGardenPlants, postGardenPlant, getGardenMissions, postGardenMission} = require('../controllers/garden')
const authMiddleware = require('../middlewares/auth')


exports.gardensRoutes = () => {
    const router = Router()

    // get all gardens 
    router.get('/',getGardens)

    //get garden by id
    router.get('/:id', authMiddleware ,getGarden)

    //get plants from garden
    router.get('/:id/plants', authMiddleware, getGardenPlants)

    //get missions from garden
    router.get('/:id/missions', authMiddleware,getGardenMissions)

    //create plant into garden
    router.post('/:id/plants', authMiddleware,postGardenPlant)

    //create mission for a garden
    router.post('/:id/missions', authMiddleware,postGardenMission)

    //update garden
    router.patch('/:id', authMiddleware,patchGarden)

    //delete garden
    router.delete('/:id', authMiddleware,deleteGarden)

    return router
}

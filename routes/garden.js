const {Router} = require('express')
const {getGarden, deleteGarden, postGarden, patchGarden, getGardenPlants, postGardenPlant, getGardenMissions, postGardenMission} = require('../controllers/garden')
const authMiddleware = require('../middlewares/auth')
const { checkGardenOwnership } = require('../middlewares/ownership')


exports.gardensRoutes = () => {
    const router = Router()


    //get garden by id
    router.get('/:id', authMiddleware ,getGarden)

    //get plants from garden
    router.get('/:id/plants', authMiddleware, getGardenPlants)

    //get missions from garden
    router.get('/:id/missions', authMiddleware,getGardenMissions)

    //create plant into garden
    router.post('/:id/plants', authMiddleware, checkGardenOwnership, postGardenPlant)

    //create mission for a garden
    router.post('/:id/missions', authMiddleware,postGardenMission)

    //update garden
    router.patch('/:id', authMiddleware, checkGardenOwnership, patchGarden)

    //delete garden
    router.delete('/:id', authMiddleware, checkGardenOwnership, deleteGarden)

    return router
}

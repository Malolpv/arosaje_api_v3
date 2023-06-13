const {Router} = require('express')
const {getGarden, getGardens, deleteGarden, postGarden, patchGarden, getGardenPlants, postGardenPlant, getGardenMissions, postGardenMission} = require('../controllers/garden')


exports.gardensRoutes = () => {
    const router = Router()

    // get all gardens 
    router.get('/',getGardens)

    //get garden by id
    router.get('/:id',getGarden)

    //get plants from garden
    router.get('/:id/plants',getGardenPlants)

    //get missions from garden
    router.get('/:id/missions',getGardenMissions)

    //create garden
    router.post('/',postGarden)

    //create plant into garden
    router.post('/:id/plants',postGardenPlant)

    //create mission for a garden
    router.post('/:id/missions',postGardenMission)

    //update garden
    router.patch('/:id',patchGarden)

    //delete garden
    router.delete('/:id',deleteGarden)

    return router
}

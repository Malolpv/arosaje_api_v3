const {findGardenById, deleteGardenById, updateGarden} = require('../services/garden')
const {findAllPlantsByGardenId,createPlant} = require('../services/plant')
const { NOT_FOUND, FORBIDDEN } = require('../utils/http_status')


exports.getGarden = async (req,res) => {
    try {
        const id = req.params.id
        const logged_user_id = req.user.id

        const garden = await findGardenById(id)
        if(garden == null) return res.status(404).json({error: `Ce jardin n'existe pas`})

        if(logged_user_id != garden.user_id) return res.status(403).json({error: 'Vous ne pouvez pas consulter les jardins d\'un autre utilisateur'})

        res.status(200).json(garden)
    }catch(error){
        console.error(error)
        res.status(500).json({error: 'Erreur lors de la consultation du jardin'})
    }
    
}

exports.getGardenPlants = async (req,res) => {
    try {
        const id_garden = req.params.id
        const logged_user_id = req.user.id

        //Le jardin existe ?
        const garden = await findGardenById(id_garden)

        if(garden == null) return res.status(NOT_FOUND).json({error: 'Jardin inexistant'})

        //Qui essaye d'accéder aux plantes du jardin ? 
        if(garden.user_id != logged_user_id) return res.status(FORBIDDEN).json({error: 'Seul le propriétaire du jardin peut consulter ses plantes'})

        const plants = await findAllPlantsByGardenId(id_garden)

        res.status(200).json(plants)
    }catch(error){
        console.error(error)
        res.status(500).json({error: 'Erreur lors de la consultation des plantes'})
    }
} 

//TODO A IMPLEMENTER
exports.getGardenMissions = async (req,res) => {
    try {
        const id_garden = req.params.id
        //TODO a Implémenter
        const plants = await findAllCurrentMissionsByGardenId(id_garden)
        if(plants == null) return res.status(404).json({error:" Not found"})
        res.status(200).json(plants)
    }catch(error){
        res.status(500).json(error)
    }
} 


exports.postGardenPlant = async (req,res) => {
    try {
        const id_garden = req.params.id
        const {name, type, sowing_date, picture} = req.body
        const logged_user_id = req.user.id

        //le jardin existe ?
        const garden = await findGardenById(id_garden)
        if(garden == null) return res.status(404).json({error: 'Impossible d\'ajouter une plante à un jardin inexistant'})

        if(garden.user_id != logged_user_id) return res.status(FORBIDDEN).json({error: 'Seulement le propriétaire du jardin peut y ajouter une plante'})

        const plant =  await createPlant({garden_id: id_garden ,name, type, sowing_date, picture}) 

        //on a cree la plante on la renvoie
        res.status(201).json(plant)
    }catch(error){
        console.error(error)
        res.status(500).json({error: 'Erreur lors de la création de la plante'})
    }
}

//TODO A IMPLEMENTER
exports.postGardenMission = async (req,res) => {
    try {
        const id_garden = req.params.id
        const plant = req.body
        //TODO
        res.status(500).json({error: 'NOT IMPLEMENTED'})
    }catch(error){
        res.status(500).json(error)
    }
}


exports.patchGarden = async (req,res) => {
    try {
        const { gardenId } = req.params // Id du garden a update
        const { name, longitude, latitude, picture } = req.body // Données a mettre à jour
    
        // Recherche le garden dans la base de données
        const garden = await findGardenById(gardenId)
    
        if (!garden) {
          // Si le garden n'est pas trouvé, renvoie un code d'erreur 404 (Non trouvé)
          return res.status(404).json('Not found')
        }
    
        // Met à jour les propriétés du garden
        garden.name = name || garden.name
        garden.longitude = longitude || garden.longitude
        garden.latitude = latitude || garden.latitude
        garden.picture = picture || garden.picture
    
        // Enregistre les modifications dans la base de données
        await updateGarden(gardenId,garden)

    
        // Répondez avec l'utilisateur mis à jour
        res.status(200).json(garden)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Une erreur est survenue lors de la mise à jour du jardin.'})
    }
}

exports.deleteGarden = async (req,res) => {
    try{
        const id_garden = req.params.id
        const logged_user_id = req.user.id

        //le jardin existe ?
        const garden = await findGardenById(id_garden)
        if(garden == null) return res.status(NOT_FOUND).json({error: 'Suppression impossible jardin inexistant'})

        // qui essaye de supprimer le jardin ?
        if(garden.user_id != logged_user_id) return res.status(FORBIDDEN).json({error: 'Seul le propriétaire du jardin peut le supprimer'})

        //suppression
        await deleteGardenById(id_garden)
        
        res.status(204)
    }catch(error){
        console.error(error)
        res.status(500).json({error: 'Erreur lors de la suppression du jardin'})
    }
}


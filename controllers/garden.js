const garden = require('../sequelize/models/garden')
const {findAllGardens, findGardenById, deleteGardenById, updateGarden} = require('../services/garden')
const {findAllPlantsByGardenId,createPlant} = require('../services/plant')

exports.getGardens = async (req,res) => {
    try {
        const gardens = await findAllGardens()
        res.status(200).json({id: 1, name: "test"})
    }catch(error){
        res.status(500).send(error)
    }
}

exports.getGarden = async (req,res) => {
    try {
        const id = req.params.id
        const garden = await findGardenById(id)
        if(garden == null) return res.status(404).send("Not found")
        res.status(200).json(garden)
    }catch(error){
        res.status(500).send(error)
    }
    
}

exports.getGardenPlants = async (req,res) => {
    try {
        const id_garden = req.params.id
        const plants = await findAllPlantsByGardenId(id_garden)
        if(plants == null) return res.status(404).send("Not found")
        res.status(200).json(plants)
    }catch(error){
        res.status(500).send(error)
    }
} 

exports.getGardenMissions = async (req,res) => {
    try {
        const id_garden = req.params.id
        const plants = await findAllMissionsByGardenId(id_garden)
        if(plants == null) return res.status(404).send("Not found")
        res.status(200).json(plants)
    }catch(error){
        res.status(500).send(error)
    }
} 


exports.postGardenPlant = async (req,res) => {
    try {
        const id_garden = req.params.id
        const {name, type, sowing_date, picture} = req.body

        //le jardin existe ?
        const garden = await findGardenById(id_garden)
        if(garden == null) return res.status(404).send('Not found')

        const plant =  await createPlant({garden_id: id_garden ,name, type, sowing_date, picture}) 

        //on a cree la plante on la renvoie
        res.status(201).json(plant)
    }catch(error){
        res.status(500).send(error)
    }
}

exports.postGardenMission = async (req,res) => {
    try {
        const id_garden = req.params.id
        const plant = req.body
        //TODO
        res.status(500).send('NOT IMPLEMENTED')
    }catch(error){
        res.status(500).send(error)
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
        res.status(500).send('Une erreur est survenue lors de la mise à jour du jardin.' )
    }
}

exports.deleteGarden = async (req,res) => {
    try{
        const id_garden = req.params.id
        const nb_rows = await deleteGardenById(id_garden)
        if(nb_rows <= 0) res.status(404).send("Not found")
        res.status(200).send()
    }catch(error){
        res.status(500).send(error)
    }
}


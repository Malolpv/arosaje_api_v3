const {findAllPlants, findPlantById, deletePlantById, updatePlant} = require('../services/plant')
const {findAllAdvicesByPlantId, createAdvice} = require('../services/advice')
const {findAllPicturesByPlantId, createPicture} = require('../services/picture')
const { NOT_FOUND, OK, INTERNAL_SERVER_ERROR, FORBIDDEN, CREATED } = require('../utils/http_status')


exports.getPlants = async (req,res) => {
    try {
        const plants = await findAllPlants()
        if(plants == null) return res.status(404).send('Not found')
        res.status(200).json(plants)
    }catch(error){
        res.status(500).send('Internal Server Error')
    }
}

exports.getPlant = async (req,res) => {
    try {
        const id = req.params.id
        const plant = await findPlantById(id)
        if(plant == null) return res.status(404).send("Not found")
        res.status(200).json(plant)
    }catch(error){
        res.status(500).send('Internal Server Error')
    }
    
}

exports.getPlantAdvices = async (req,res) => {
    try{
        const id_plant = req.params.id

        //la plante existe ?
        const plant =  await findPlantById(id_plant)
        if(plant == null) return res.status(NOT_FOUND).json({error: 'La plante n\'existe pas'})

        //chargement des advices
        const advices = await findAllAdvicesByPlantId(id_plant)
        
        res.status(OK).json(advices)
    }catch(error){
        res.send(INTERNAL_SERVER_ERROR).send({error: 'Erreur lors de la consultation des conseils'})
    }
}

exports.getPlantPictures = async (req,res) => {
    try{
        const id_plant = req.params.id

        //la plante existe ?
        const plant =  await findPlantById(id_plant)
        if(plant == null) return res.status(NOT_FOUND).json({error: 'La plante n\'existe pas'})

        //chargement des pictures
        const pictures = await findAllPicturesByPlantId(id_plant)
        
        res.status(OK).json(pictures)
    }catch(error){
        res.send(INTERNAL_SERVER_ERROR).json({error: 'Erreur lors de la consultations des photos'})
    }
}


exports.postPlantPicture = async (req,res) => {
    try {
        const id_plant = req.params.id
        const {content} = req.body
        const logged_user_id = req.user.id

        //la plante existe ?
        const plant = await findPlantById(id_plant)
        if(plant == null) return res.status(NOT_FOUND).json({error: 'La plante n\'existe pas'})

        //creation de la nouvelle picture
        const picture =  await createPicture({plant_id: id_plant, user_id: logged_user_id, content}) 

        //on a cree la picture on la renvoie
        res.status(OK).json(picture)
    }catch(error){
        res.status(INTERNAL_SERVER_ERROR).json({error: 'Erreur lors de la création de la photo'})
    }
}

//TODO Ajouter le userid a l'advice
exports.postPlantAdvice = async (req,res) => {
    try {
        const id_plant = req.params.id
        const {content} = req.body
        const user = req.user

        //le user connecte est un botaniste ?
        if(!user.is_botaniste) return res.status(FORBIDDEN).json({error: 'Seulement les botanistes peuvent donner des conseils'})

        //la plante existe ?
        const plant = await findPlantById(id_plant)
        if(plant == null) return res.status(NOT_FOUND).json('La plante n\'existe pas')

        //creation du conseil
        const advice =  await createAdvice({plant_id: id_plant, user_id: user.id, content}) 

        //on a cree l'advice on la renvoie
        res.status(CREATED).json(advice)
    }catch(error){
        res.status(INTERNAL_SERVER_ERROR).json({error: 'Erreur lors de la creation du conseil'})
    }
}

exports.patchPlant = async (req,res) => {
    try {
        const plant_id = req.params.id
        const {name, type, sowing_date, picture} = req.body
        
        const plant = await findPlantById(plant_id)

        if(!plant) return res.status(NOT_FOUND).json({error: 'Plante inexistante'})

        plant.name = name || plant.name
        plant.type = type || plant.type
        plant.sowing_date = sowing_date || plant.sowing_date
        plant.picture = picture || plant.picture


        await updatePlant(plant_id, plant)

        res.status(OK).json(plant)
    }catch(error){
        console.error(error)
        res.status(INTERNAL_SERVER_ERROR).send('Erreur lors de la modification de la plante')
    }
}

exports.deletePlant = async (req,res) => {
    try{
        const id_plant = req.params.id

        const nb_rows = await deletePlantById(id_plant)
        if(nb_rows <= 0) res.status(NOT_FOUND).json({error: 'Plante inexistante'})

        res.status(OK)
    }catch(error){
        console.error(error)
        res.status(INTERNAL_SERVER_ERROR).json({error: 'Erreur lors de la suppression de la plante'})
    }
}
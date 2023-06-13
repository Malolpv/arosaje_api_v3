const {findAllPlants, findPlantById, deletePlantById, updatePlant} = require('../services/plant')
const {findAllAdvicesByPlantId, createAdvice} = require('../services/advice')
const {findAllPicturesByPlantId, createPicture} = require('../services/picture')


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
        const advices = await findAllAdvicesByPlantId(id_plant)
        if(advices == null) return res.status(404).send('Not found')
        res.status(200).json(advices)
    }catch(error){
        res.send(500).send('Internal Server Error')
    }
}

exports.getPlantPictures = async (req,res) => {
    try{
        const id_plant = req.params.id
        const pictures = await findAllPicturesByPlantId(id_plant)
        if(pictures == null) return res.status(404).send('Not found')
        res.status(200).json(pictures)
    }catch(error){
        res.send(500).send('Internal Server Error')
    }
}

//TODO ajouter le user_id a l'advice
exports.postPlantPicture = async (req,res) => {
    try {
        const id_plant = req.params.id
        const {content} = req.body

        //la plante existe ?
        const plant = await findPlantById(id_plant)
        if(plant == null) return res.status(404).send('Not found')

        const picture =  await createPicture({plant_id: id_plant, user_id: null, content}) 

        //on a cree la picture on la renvoie
        res.status(201).json(picture)
    }catch(error){
        res.status(500).send('Internal Server Error')
    }
}

//TODO Ajouter le userid a l'advice
exports.postPlantAdvice = async (req,res) => {
    try {
        const id_plant = req.params.id
        const {content} = req.body

        //la plante existe ?
        const plant = await findPlantById(id_plant)
        if(plant == null) return res.status(404).send('Not found')

        const advice =  await createAdvice({plant_id: id_plant, user_id: null, content}) 

        //on a cree l'advice on la renvoie
        res.status(201).json(advice)
    }catch(error){
        res.status(500).send('Internal Server Error')
    }
}

exports.patchPlant = async (req,res) => {
    try {
        const plant_id = req.params.id
        const {name, type, sowing_date, picture} = req.body
        
        const plant = await findPlantById(plant_id)

        if(!plant) return res.status(404).send('Not found')

        plant.name = name || plant.name
        plant.type = type || plant.type
        plant.sowing_date = sowing_date || plant.sowing_date
        plant.picture = picture || plant.picture


        await updatePlant(plant_id, plant)

        res.status(200).json(plant)
    }catch(error){
        res.status(500).send('Internal Server Error')
    }
}

exports.deletePlant = async (req,res) => {
    try{
        const id_plant = req.params.id
        const nb_rows = await deletePlantById(id_plant)
        if(nb_rows <= 0) res.status(404).send("Not found")
        res.status(200).send()
    }catch(error){
        res.status(500).send('Internal Server Error')
    }
}
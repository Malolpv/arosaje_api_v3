const {Plant} = require('../sequelize/models')

exports.findAllPlants = async () => {
    return await Plant.findAll()
}

exports.findPlantById = async (id_plant) => {
    return await Plant.findOne({where: {id: id_plant}})
}

exports.createPlant = async (plant) => {
    return await Plant.create(plant)
}

exports.updatePlant = async (id_plant, plant) => {
    return await Plant.update(plant,{where: {id: id_plant}})
}

exports.deletePlantById = async (id_plant) => {
    return await Plant.destroy({where: {id: id_plant}})
}
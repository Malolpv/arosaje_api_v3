const {Garden} = require('../sequelize/models')

exports.findAllGardens = async () => {
    return await Garden.findAll()
}

exports.findGardenById = async (id_garden) => {
    return await Garden.findOne({where: {id: id_garden}})
}

exports.createGarden = async (garden) => {
    return await Garden.create(garden)
}

exports.updateGarden = async (id_garden, garden) => {
    return await Garden.update(garden,{where: {id: id_garden}})
}

exports.deleteGardenById = async (id_garden) => {
    return await Garden.destroy({where: {id: id_garden}})
}

exports.findAllGardensByUserId = async (id_user) => {
    return await Garden.findAll({where: {user_id: id_user}})
}
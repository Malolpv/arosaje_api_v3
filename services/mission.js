const {Mission} = require('../sequelize/models')

exports.findAllMissions = async () => {
    return await Mission.findAll()
}

exports.findMissionById = async (id_mission) => {
    return await Mission.findOne({where: {id: id_mission}})
}

exports.createMission = async (mission) => {
    return await Mission.create(mission)
}

exports.updateMission = async (id_mission, mission) => {
    return await Mission.update(mission,{where: {id: id_mission}})
}

exports.deleteMissionById = async (id_mission) => {
    return await Mission.destroy({where: {id: id_mission}})
}
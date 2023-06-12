const {Advice} = require('../sequelize/models')

exports.findAllAdvices = async () => {
    return await Advice.findAll()
}

exports.findAdviceById = async (id_advice) => {
    return await Advice.findOne({where: {id: id_advice}})
}

exports.createAdvice = async (advice) => {
    return await Advice.create(advice)
}

exports.updateAdvice = async (id_advice, advice) => {
    return await Advice.update(advice,{where: {id: id_advice}})
}

exports.deleteAdviceById = async (id_advice) => {
    return await Advice.destroy({where: {id: id_advice}})
}
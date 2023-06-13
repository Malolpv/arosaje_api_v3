const {User} = require('../sequelize/models')

exports.findAllUsers = async () => {
    return await User.findAll()
}

exports.findUserById = async (id_user) => {
    return await User.findOne({where: {id: id_user}})
}

exports.createUser = async (user) => {
    return await User.create(user)
}

exports.updateUser = async (id_user, user) => {
    return await User.update(user,{where: {id: id_user}})
}

exports.deleteUserById = async (id_user) => {
    return await User.destroy({where: {id: id_user}})
}

exports.emailExist = async (email) => {
    return await User.findOne({where: {email: email}})
}
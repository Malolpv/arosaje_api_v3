const {Picture} = require('../sequelize/models')

exports.findAllPictures = async () => {
    return await Picture.findAll()
}

exports.findPictureById = async (id_picture) => {
    return await Picture.findOne({where: {id: id_picture}})
}

exports.createPicture = async (picture) => {
    return await Picture.create(picture)
}

exports.updatePicture = async (id_picture, picture) => {
    return await Picture.update(picture,{where: {id: id_picture}})
}

exports.deletePictureById = async (id_picture) => {
    return await Picture.destroy({where: {id: id_picture}})
}
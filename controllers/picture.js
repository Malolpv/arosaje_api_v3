const {findPictureById,updatePicture ,deletePictureById} = require('../services/picture')


exports.getPicture = async (req,res) => {
    try {
        const id = req.params.id
        const picture = await findPictureById(id)
        if(picture == null) return res.status(404).send("Not found")
        res.status(200).json(picture)
    }catch(error){
        res.status(500).send(error)
    }
    
}

exports.deletePicture = async (req,res) => {
    try{
        const id_picture = req.params.id
        const nb_rows = await deletePictureById(id_picture)
        if(nb_rows <= 0) res.status(404).send("Not found")
        res.status(200).send()
    }catch(error){
        res.status(500).send(error)
    }
}
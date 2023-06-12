const user = require('../sequelize/models/user')
const {findAllUsers, findUserById, deleteUserById} = require('../services/user')


exports.getUsers = async (req,res) => {
    try {
        const users = await findAllUsers()
        res.status(200).json({id: 1, name: "test"})
    }catch(error){
        res.status(500).send(error)
    }
}

exports.getUser = async (req,res) => {
    try {
        const id = req.params.id
        const user = await findUserById(id)
        if(user == null) return res.status(404).send("Not found")
        res.status(200).json(user)
    }catch(error){
        res.status(500).send(error)
    }
    
}

exports.postUser = async (req,res) => {
    try {
        const model = req.body
        
        res.status(500).send("NOT IMPLEMENTED")
    }catch(error){
        res.status(500).send(error)
    }
}

exports.patchUser = async (req,res) => {
    try {
        const model = req.body
        
        res.status(500).send("NOT IMPLEMENTED")
    }catch(error){
        res.status(500).send(error)
    }
}

exports.deleteUser = async (req,res) => {
    let id = req.params.id
    try{
        const id_user = req.params.id
        const nb_rows = await deleteUserById(id_user)
        if(nb_rows <= 0) res.status(404).send("Not found")
        res.status(200).send()
    }catch(error){
        res.status(500).send(error)
    }
}
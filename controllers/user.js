const {findAllUsers, findUserById, deleteUserById, updateUser, isEmailTaken, createUser} = require('../services/user')
const {findAllGardensByUserId, createGarden} = require('../services/garden')

exports.getUsers = async (req,res) => {
    try {
        const users = await findAllUsers()
        if(users == null) return res.status(404).send('Not found')
        res.status(200).json(users)
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

exports.getUserGardens = async (req,res) => {
    try {
        const user_id = req.params.id
        const gardens = await findAllGardensByUserId(user_id)
        if(gardens == null) return res.status(404).send('Not found')
        res.status(200).json(gardens)
    }catch(error){
        res.status(500).send(error)
    }
}

exports.postUserGarden = async (req,res) => {
    try {
        const { userId } = req.params // Id du user propriétaire du jardin
        const { name, latitude, longitude, picture } = req.body // charge les données du jardin
        
        // Recherchez l'utilisateur dans la base de données
        const user = await findUserById(userId)
    
        if (!user) {
          // Si l'utilisateur n'est pas trouvé, renvoie un code d'erreur 404 (Non trouvé)
          return res.status(404).json('Not found')
        }
    
        // Créée une nouvelle instance de Garden avec les données reçues
        const garden = createGarden({user_id: userId, name, latitude, longitude, picture})

        // jardin créé code de statut 201 (Créé)
        res.status(201).json(garden)

    } catch (error) {
        // En cas d'erreur, répondez avec un code d'erreur approprié (par exemple, 500 pour une erreur interne du serveur) et un message d'erreur
        res.status(500).send('Une erreur est survenue lors de la création du jardin.' )
    }
}

exports.patchUser = async (req,res) => {
    try {
        const { userId } = req.params // Id du user a update
        const { pseudo, email, password, is_botaniste } = req.body // Données a mettre à jour
    
        // Recherche l'utilisateur dans la base de données
        const user = await findUserById(userId)
    
        if (!user) {
          // Si l'utilisateur n'est pas trouvé, renvoie un code d'erreur 404 (Non trouvé)
          return res.status(404).json('Not found')
        }
    
        // Met à jour les propriétés de l'utilisateur
        user.pseudo = pseudo || user.pseudo
        user.email = email || user.email
        user.password = password || user.password
        user.is_botaniste = is_botaniste || user.is_botaniste
    
        // Enregistre les modifications dans la base de données
        await updateUser(userId,user)

    
        // Répondez avec l'utilisateur mis à jour
        res.status(200).json(user)
    } catch (error) {
        // En cas d'erreur, répondez avec un code d'erreur approprié (par exemple, 500 pour une erreur interne du serveur) et un message d'erreur
        res.status(500).send('Une erreur est survenue lors de la mise à jour de l\'utilisateur.' )
    }
}

exports.deleteUser = async (req,res) => {
    try{
        const id_user = req.params.id
        const nb_rows = await deleteUserById(id_user)
        if(nb_rows <= 0) res.status(404).send("Not found")
        res.status(200).send()
    }catch(error){
        res.status(500).send(error)
    }
}
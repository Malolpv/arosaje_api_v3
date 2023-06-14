const {findAllUsers, findUserById, deleteUserById, updateUser, isEmailTaken, createUser} = require('../services/user')
const {findAllGardensByUserId, createGarden} = require('../services/garden')
const { FORBIDDEN, NOT_FOUND, OK, INTERNAL_SERVER_ERROR } = require('../utils/http_status')

exports.getUsers = async (req,res) => {
    try {
        const users = await findAllUsers()
        if(users == null) return res.status(NOT_FOUND).send('Not found')
        res.status(OK).json(users)
    }catch(error){
        res.status(INTERNAL_SERVER_ERROR).send(error)
    }
}

exports.getUser = async (req,res) => {
    try {
        const id = req.params.id
        const user = await findUserById(id)
        if(user == null) return res.status(NOT_FOUND).send("Not found")
        res.status(OK).json(user)
    }catch(error){
        res.status(INTERNAL_SERVER_ERROR).send(error)
    }
    
}

exports.getUserGardens = async (req,res) => {
    try {
        const user_id = req.params.id
        const gardens = await findAllGardensByUserId(user_id)
        if(gardens == null) return res.status(NOT_FOUND).send('Not found')

        res.status(OK).json(gardens)
    }catch(error){
        console.error(error)
        res.status(INTERNAL_SERVER_ERROR).send(error)
    }
}

exports.postUserGarden = async (req,res) => {
    try {
        const user_id  = req.params.id // Id du user propriétaire du jardin
        const { name, latitude, longitude, picture } = req.body // charge les données du jardin
        const logged_user_id = req.user.id

        //on vérifie que c'est bien le user loggé qui essaye de s'ajouter un jardin
        if (user_id != logged_user_id) return res.status('FORBIDDEN').json({error: 'FORBIDDEN'})

        // Recherchez l'utilisateur dans la base de données
        const user = await findUserById(user_id)
    
        if (!user) {
          // Si l'utilisateur n'est pas trouvé, renvoie un code d'erreur NOT_FOUND (Non trouvé)
          return res.status(NOT_FOUND).json({error: 'Not found'})
        }
    
        // Créée une nouvelle instance de Garden avec les données reçues
        const garden = await createGarden({user_id: user_id, name, latitude, longitude, picture})

        // jardin créé code de statut 201 (Créé)
        res.status(201).json(garden)

    } catch (error) {
        console.error(error)
        // En cas d'erreur, répondez avec un code d'erreur approprié (par exemple, INTERNAL_SERVER_ERROR pour une erreur interne du serveur) et un message d'erreur
        res.status(INTERNAL_SERVER_ERROR).send('Une erreur est survenue lors de la création du jardin.' )
    }
}

exports.patchUser = async (req,res) => {
    try {
        const user_id = req.params.id // Id du user a update
        const { pseudo, email, password, is_botaniste } = req.body // Données a mettre à jour
        const logged_user_id = req.user.id

        //On check que c'est bien le user lui meme qui veut mettre à jour son compte
        if(user_id != logged_user_id) res.status(FORBIDDEN).json({error: 'Seul le propriétaire du compte peut mettre à jour ses données'})

        // Recherche l'utilisateur dans la base de données
        const user = await findUserById(user_id)
    
        if (!user) {
          // Si l'utilisateur n'est pas trouvé, renvoie un code d'erreur NOT_FOUND (Non trouvé)
          return res.status(NOT_FOUND).json('Not found')
        }
    
        // Met à jour les propriétés de l'utilisateur
        user.pseudo = pseudo || user.pseudo
        user.email = email || user.email
        user.password = password || user.password
        user.is_botaniste = is_botaniste || user.is_botaniste
    
        // Enregistre les modifications dans la base de données
        await updateUser(user_id,user)

    
        // Répondez avec l'utilisateur mis à jour
        res.status(OK).json(user)
    } catch (error) {
        // En cas d'erreur, répondez avec un code d'erreur approprié (par exemple, INTERNAL_SERVER_ERROR pour une erreur interne du serveur) et un message d'erreur
        res.status(INTERNAL_SERVER_ERROR).send('Une erreur est survenue lors de la mise à jour de l\'utilisateur.' )
    }
}

exports.deleteUser = async (req,res) => {
    try{
        const id_user = req.params.id
        const logged_user_id = req.user.id

        //On check que c'est bien le user lui meme qui veut supprimer son compte
        if(user_id != logged_user_id) res.status(FORBIDDEN).json({error: 'seul le propriétaire du compte peut supprimer son compte'})

        const nb_rows = await deleteUserById(id_user)
        if(nb_rows <= 0) res.status(NOT_FOUND).send("Not found")
        res.status(OK).send()
    }catch(error){
        res.status(INTERNAL_SERVER_ERROR).send(error)
    }
}
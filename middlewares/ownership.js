const { findGardenWhere } = require("../services/garden")
const { FORBIDDEN, INTERNAL_SERVER_ERROR } = require("../utils/http_status")
const { findAdviceWhere } = require('../services/advice')
const { findPictureWhere } = require('../services/picture')

// verifie que la plante appartient bien à l'utilisateur connecte
const checkPlantOwnership = async (req,res,next) => {
    try {
        const logged_user_id = req.user.id
        const {garden_id} = req.body

        //le garden avec l'id user connecte existe ?
        const garden = await findGardenWhere({id: garden_id, user_id: logged_user_id})

        if(garden == null) return res.status(FORBIDDEN).json({error: 'Non autorisé'})
        
        //callback
        next()
    } catch (error) {
        console.error(error)
        return res.status(INTERNAL_SERVER_ERROR).json({error: 'Erreur interne au serveur'})
    }
}

// verifie que le garden appartient bien à l'utilisateur connecte
const checkGardenOwnership = async (req,res,next) => {
    try {
        const logged_user_id = req.user.id
        const garden_id = req.params.id

        //le garden avec l'id user connecte existe ?
        const garden = await findGardenWhere({id: garden_id, user_id: logged_user_id})

        if(garden == null) return res.status(FORBIDDEN).json({error: 'Non autorisé'})

        req.garden = garden

        //callback
        next()
    } catch (error) {
        console.error(error)
        return res.status(INTERNAL_SERVER_ERROR).json({error: 'Erreur interne au serveur'})
    }
}

const checkPictureOwnership = async (req,res,next) => {
    try {
        const logged_user_id = req.user.id
        const {picture_id} = req.params.id

        //la picture avec l'id user connecte existe ?
        const picture = await findPictureWhere({id: picture_id, user_id: logged_user_id})

        if(picture == null) return res.status(FORBIDDEN).json({error: 'Non autorisé'})

        req.picture = picture

        //callback
        next()
    } catch (error) {
        console.error(error)
        return res.status(INTERNAL_SERVER_ERROR).json({error: 'Erreur interne au serveur'})
    }
}

const checkAdviceOwnership = async (req,res,next) => {
    try {
        const logged_user_id = req.user.id
        const {advice_id} = req.params.id

        //l'advice avec l'id user connecte existe ?
        const advice = await findAdviceWhere({id: advice_id, user_id: logged_user_id})

        if(advice == null) return res.status(FORBIDDEN).json({error: 'Non autorisé'})

        req.advice = advice

        //callback
        next()
    } catch (error) {
        console.error(error)
        return res.status(INTERNAL_SERVER_ERROR).json({error: 'Erreur interne au serveur'})
    }
}

module.exports = {
    checkPlantOwnership,
    checkGardenOwnership,
    checkPictureOwnership,
    checkAdviceOwnership
}
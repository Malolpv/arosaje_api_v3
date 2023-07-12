const {Router} = require('express')
const {register, login} = require('../controllers/auth')


/**
 * @swagger
 * tags:
 *  name: Authorization
 *  description: default user login/register and generate authorization token for other endpoints
 *
 */

exports.authRoutes = () => {
    const router = Router()

    // login route 
    /**
    * @swagger
    *   /login:
    *       post:
    *           tags:
    *               - Authorization
    *           summary: "Returns authorisation Token"
    *           description: "Authorizes default users with username and password set as root to use the endpoints"
    *           requestBody:
    *               content:
    *                   application/json:
    *                       schema:
    *                           type: object
    *                           properties:
    *                               email:
    *                                   type: string
    *                               password:
    *                                   type: string
    *                       example:
    *                           email: "john.doe@email.com"
    *                           password: johndoepass
    *           produces:
    *               - application/json
    *           responses:
    *               200:
    *                   description: "Authorization token"
    *                   content:
    *                       application/json:
    *                           schema: 
    *                               type: object
    *                           example:
    *                               {"token" : "user token"}
    *               401:
    *                   description: "Unauthorized"
    *                   content:
    *                       application/json:
    *                           schema: 
    *                               type: object
    *                           example:
    *                               {"message" : "Email ou mot de passe invalide"}
    *               500:
    *                   description: "Internal server error"
    *                   content:
    *                       application/json:
    *                           schema: 
    *                               type: object
    *                           example:
    *                               {"message" : "Internal server error"}
    */
    router.post('/login',login)

    //register route
    /**
    * @swagger
    *   /reigster:
    *       post:
    *           tags:
    *               - Authorization
    *           summary: "Returns authorisation Token"
    *           description: "Create given user account"
    *           requestBody:
    *               content:
    *                   application/json:
    *                       schema:
    *                           type: object
    *                           properties:
    *                               email:
    *                                   type: string
    *                               password:
    *                                   type: string
    *                               pseudo:
    *                                   type: string
    *                               is_botaniste:
    *                                   type: bool
    *                       example:
    *                           email: "john.doe@email.com"
    *                           password: johndoepass
    *                           pseudo: "john_the_best_gardener"
    *                           is_botaniste: true
    *           produces:
    *               - application/json
    *           responses:
    *               200:
    *                   description: "Successfull registration"
    *                   content:
    *                       application/json:
    *                           schema: 
    *                               type: object
    *                           example:
    *                               {"token" : "user token"}
    *               409:
    *                   description: "Unauthorized"
    *                   content:
    *                       application/json:
    *                           schema: 
    *                               type: object
    *                           example:
    *                               {"message" : "Un compte existe déjà pour cet email"}
    *               500:
    *                   description: "Internal server error"
    *                   content:
    *                       application/json:
    *                           schema: 
    *                               type: object
    *                           example:
    *                               {"message" : "Internal server error"}
    */
    router.post('/register',register)

    return router
}

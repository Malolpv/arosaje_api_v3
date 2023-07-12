const {Router} = require('express')
const {getUser, getUsers, deleteUser, patchUser, getUserGardens, postUserGarden} = require('../controllers/user')
const authMiddleware = require('../middlewares/auth')


/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Users related routes
 *
 */

exports.usersRoutes = () => {
    const router = Router()


    // get all users 
    router.get('/', getUsers)

    //get user by id
    /**
     * @swagger
     *  /users/{id}:
     *      get:
     *          tags:
     *              - Users
     *          summary: Retrieve a User by id
     *          parameters:
     *             - in: path
     *               name: id
     *               required: true
     *               schema: 
     *                   type: integer
     *               description: Id of the garden to retrieve
     *          responses:
     *              '200':
     *                  description: Successful operation
     *                  content:
     *                      application/json:
     *                          schema: 
     *                              $ref: '#/components/schemas/User'
     */
    router.get('/:id', getUser)

    //get user gardens
    /**
    * @swagger
    *   /users/{id}/gardens:
    *       get:
    *           tags:
    *               - Users
    *           summary: Retrieve all the gardens owned by the given user
    *           parameters:
    *              - in: path
    *                name: id
    *                required: true
    *                schema: 
    *                    type: integer
    *                description: User's id
    *           responses:
    *               '200':
    *                   description: Successfull operation
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: array
    *                               items:
    *                                   $ref: '#/components/schemas/Garden'
    *               '404':
    *                   description: User not found
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: 
    *                               "error" : "Utilisateur inexistant"
    *               '403':
    *                   description: Unauthorized
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: 
    *                               "error" : "Seul le propriétaire peut consulter ses jardins"
    *               '500':
    *                   description: Internal server error
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: 
    *                               "error" : "Erreur lors de la consultation des jardin"
    */
    router.get('/:id/gardens', authMiddleware,getUserGardens)

    //create user garden
    /**
    * @swagger
    *   /users/{id}/gardens:
    *       post:
    *           tags:
    *               - Users
    *           summary: create given garden for the logged user 
    *           parameters:
    *              - in: path
    *                name: id
    *                required: true
    *                schema: 
    *                    type: integer
    *                description: Id of the garden 
    *           requestBody:
    *               content:
    *                   application/json:
    *                       schema:
    *                           $ref: '#/components/schemas/Garden'
    *                       example:
    *                           name: 'my dummy garden'
    *                           latitude: 33.0
    *                           longitude: 33.0
    *                           picture: 'my base64 encoded picture'
    *           produces:
    *               - application/json
    *           responses:
    *               '201':
    *                   description: Successfull operation
    *                   content:
    *                       application/json:
    *                           schema:
    *                               $ref: '#/components/schemas/Garden'
    *               '404':
    *                   description: Garden not found
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: 
    *                               "error" : "Utilisateur inexistant"
    *               '403':
    *                   description: Unauthorized
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: 
    *                               "error" : "La création de jardin pour un autre utilisateur n'est pas autorisée"
    *               '500':
    *                   description: Internal server error
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: 
    *                               "error" : "Erreur lors de la création de la plante"
    */
    router.post('/:id/gardens', authMiddleware,postUserGarden)

    //update user
    /**
    * @swagger
    *   /users/{id}:
    *       patch:
    *           tags:
    *               - Users
    *           summary: Update given user 
    *           parameters:
    *              - in: path
    *                name: id
    *                required: true
    *                schema: 
    *                    type: integer
    *                description: Id of the user to update 
    *           requestBody:
    *               content:
    *                   application/json:
    *                       schema:
    *                           $ref: '#/components/schemas/User'
    *                       example:
    *                           pseudo: 'john the gardener'
    *                           email: 'john.doe@email.com'
    *                           password: 'my encripted password'
    *                           is_botaniste: true
    *           produces:
    *               - application/json
    *           responses:
    *               '201':
    *                   description: Successfull operation
    *                   content:
    *                       application/json:
    *                           schema:
    *                               $ref: '#/components/schemas/User'
    *               '404':
    *                   description: User not found
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: 
    *                               "error" : "Utilisateur inexistant"
    *               '403':
    *                   description: Unauthorized
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: 
    *                               "error" : "Seul le propriétaire du compte peut mettre à jour ses données"
    *               '500':
    *                   description: Internal server error
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: 
    *                               "error" : "Une erreur est survenue lors de la mise à jour de l'utilisateur."
    */
    router.patch('/:id', authMiddleware,patchUser)

    //delete user
    /**
    * @swagger
    *   /users/{id}:
    *       delete:
    *           tags:
    *               - Users
    *           summary: delete a user by id
    *           parameters:
    *              - in: path
    *                name: id
    *                required: true
    *                schema: 
    *                    type: integer
    *                    example: 1
    *                description: Id of the user to delete
    *           responses:
    *               '204':
    *                   description: User Deleted
    *               '403':
    *                   description: Unauthorized
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: 
    *                               "error" : "Seul le propriétaire du compte peut supprimer son compte"
    *               '404':
    *                   description: User not found
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: 
    *                               "error" : "Utilisateur inexistant"
    *               '500':
    *                   description: Internal server error
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: 
    *                               "error" : "Erreur lors de la suppression de l'utilisateur"
    */
    router.delete('/:id', authMiddleware,deleteUser)

    return router
}

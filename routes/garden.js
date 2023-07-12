const {Router} = require('express')
const {getGarden, deleteGarden, postGarden, patchGarden, getGardenPlants, postGardenPlant, getGardenMissions, postGardenMission} = require('../controllers/garden')
const authMiddleware = require('../middlewares/auth')
const { checkGardenOwnership } = require('../middlewares/ownership')



/**
 * @swagger
 * tags:
 *  name: Gardens
 *  description: Garden related routes
 *
 */


exports.gardensRoutes = () => {
    const router = Router()

    //get garden by id
    /**
    * @swagger
    *   /gardens/{id}:
    *       get:
    *           tags:
    *               - Gardens
    *           summary: Retrieve a garden by id
    *           parameters:
    *              - in: path
    *                name: id
    *                required: true
    *                schema: 
    *                    type: integer
    *                description: Id of the garden to retrieve
    *           responses:
    *               '200':
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
    *                           example: Ce jardin n'existe pas
    *               '500':
    *                   description: Internal server error
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: Erreur lors de la consultation du jardin
    */
    router.get('/:id', authMiddleware ,getGarden)

    //get plants from garden
    /**
    * @swagger
    *   /gardens/{id}/plants:
    *       get:
    *           tags:
    *               - Gardens
    *           summary: Retrieve all the plants from the given garden 
    *           parameters:
    *              - in: path
    *                name: id
    *                required: true
    *                schema: 
    *                    type: integer
    *                description: Id of the garden 
    *           responses:
    *               '200':
    *                   description: Successfull operation
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: array
    *                               items:
    *                                   $ref: '#/components/schemas/Plant'
    *               '404':
    *                   description: Garden not found
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: 
    *                               "error" : "jardin inexistant"
    *               '403':
    *                   description: Unauthorized
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: 
    *                               "error" : "Seul le propriétaire du jardin peut consulter ses plantes"
    *               '500':
    *                   description: Internal server error
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: 
    *                               "error" : "Erreur lors de la consultation du jardin"
    */
    router.get('/:id/plants', authMiddleware, getGardenPlants)

    //get missions from garden
    router.get('/:id/missions', authMiddleware,getGardenMissions)

    //create plant into garden
    /**
    * @swagger
    *   /gardens/{id}/plants:
    *       post:
    *           tags:
    *               - Gardens
    *           summary: create given plant into a garden 
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
    *                           $ref: '#/components/schemas/Plant'
    *                       example:
    *                           name: 'my dummy plant'
    *                           sowing_date: '2023-06-14'
    *                           type: 'flower'
    *                           picture: 'my base64 encoded picture'
    *           produces:
    *               - application/json
    *           responses:
    *               '201':
    *                   description: Successfull operation
    *                   content:
    *                       application/json:
    *                           schema:
    *                               $ref: '#/components/schemas/Plant'
    *               '404':
    *                   description: Garden not found
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: 
    *                               "error" : "jardin inexistant"
    *               '403':
    *                   description: Unauthorized
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: 
    *                               "error" : "Non autorisé"
    *               '500':
    *                   description: Internal server error
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: 
    *                               "error" : "Une erreur est survenue lors de la création du jardin."
    */
    router.post('/:id/plants', authMiddleware, checkGardenOwnership, postGardenPlant)

    //create mission for a garden
    router.post('/:id/missions', authMiddleware,postGardenMission)

    //update garden
    router.patch('/:id', authMiddleware, checkGardenOwnership, patchGarden)

    //delete garden
    /**
    * @swagger
    *   /gardens/{id}:
    *       delete:
    *           tags:
    *               - Gardens
    *           summary: delete a garden by id
    *           parameters:
    *              - in: path
    *                name: id
    *                required: true
    *                schema: 
    *                    type: integer
    *                    example: 1
    *                description: Id of the garden to delete
    *           responses:
    *               '204':
    *                   description: Garden suppressed
    *               '500':
    *                   description: Internal server error
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: Erreur lors de la suppression du jardin
    */
    router.delete('/:id', authMiddleware, checkGardenOwnership, deleteGarden)

    return router
}

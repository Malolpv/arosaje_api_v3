const {Router} = require('express')
const {getPlant, getPlants, deletePlant, postPlant, patchPlant, getPlantPictures, getPlantAdvices, postPlantPicture, postPlantAdvice} = require('../controllers/plant')
const authMiddleware = require('../middlewares/auth')
const {checkPlantOwnership} = require('../middlewares/ownership')


/**
 * @swagger
 * tags:
 *  name: Gardens
 *  description: Garden related routes
 *
 */

exports.plantsRoutes = () => {
    const router = Router()

    // get all plants 
    router.get('/', authMiddleware, getPlants)

    //get plant by id
    router.get('/:id', authMiddleware, getPlant)

    //get picture by blant id
    /**
    * @swagger
    *   /plants/{id}/pictures:
    *       get:
    *           tags:
    *               - Plants
    *           summary: Retrieve all the pictures from the given plant 
    *           parameters:
    *              - in: path
    *                name: id
    *                required: true
    *                schema: 
    *                    type: integer
    *                description: Id of the plant 
    *           responses:
    *               '200':
    *                   description: Successfull operation
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: array
    *                               items:
    *                                   $ref: '#/components/schemas/Picture'
    *               '404':
    *                   description: Plant not found
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: 
    *                               "error" : "La plante n'existe pas"
    *               '500':
    *                   description: Internal server error
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: 
    *                               "error" : "Erreur lors de la consultations des photos"
    */
    router.get('/:id', authMiddleware, getPlantPictures)

    //get advice by plant id
    /**
    * @swagger
    *   /plants/{id}/advices:
    *       get:
    *           tags:
    *               - Plants
    *           summary: Retrieve all the advices from the given plant 
    *           parameters:
    *              - in: path
    *                name: id
    *                required: true
    *                schema: 
    *                    type: integer
    *                description: Id of the plant 
    *           responses:
    *               '200':
    *                   description: Successfull operation
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: array
    *                               items:
    *                                   $ref: '#/components/schemas/Advice'
    *               '404':
    *                   description: Plant not found
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: 
    *                               "error" : "La plante n'existe pas"
    *               '500':
    *                   description: Internal server error
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: 
    *                               "error" : "Erreur lors de la consultations des conseils"
    */
    router.get('/:id', authMiddleware, getPlantAdvices)

    //create picture for plant
    /**
    * @swagger
    *   /plants/{id}/pictures:
    *       post:
    *           tags:
    *               - Plants
    *           summary: Create a picture for the plant referenced by {id} 
    *           parameters:
    *              - in: path
    *                name: id
    *                required: true
    *                schema: 
    *                    type: integer
    *                description: Id of the plant
    *           requestBody:
    *               content:
    *                   application/json:
    *                       schema:
    *                           $ref: '#/components/schemas/Picture'
    *                       example:
    *                           content: "My base64 encoded picture"
    *           produces:
    *               - application/json
    *           responses:
    *               '201':
    *                   description: Successfull operation
    *                   content:
    *                       application/json:
    *                           schema:
    *                               $ref: '#/components/schemas/Picture'
    *               '404':
    *                   description: Garden not found
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: 
    *                               "error" : "La plante n'existe pas"
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
    *                               "error" : "Erreur lors de la création de la photo"
    */
    router.post('/:id/pictures', authMiddleware, postPlantPicture)
    
    //create picture for plant
    /**
    * @swagger
    *   /plants/{id}/advices:
    *       post:
    *           tags:
    *               - Plants
    *           summary: Create an advice for the plant referenced by {id} 
    *           parameters:
    *              - in: path
    *                name: id
    *                required: true
    *                schema: 
    *                    type: integer
    *                description: Id of the plant
    *           requestBody:
    *               content:
    *                   application/json:
    *                       schema:
    *                           $ref: '#/components/schemas/Advice'
    *                       example:
    *                           content: "The botanist advice"
    *           produces:
    *               - application/json
    *           responses:
    *               '201':
    *                   description: Successfull operation
    *                   content:
    *                       application/json:
    *                           schema:
    *                               $ref: '#/components/schemas/Advice'
    *               '404':
    *                   description: Garden not found
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: 
    *                               "error" : "La plante n'existe pas"
    *               '403':
    *                   description: Unauthorized
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: 
    *                               "error" : "Seulement les botanistes peuvent donner des conseils"
    *               '500':
    *                   description: Internal server error
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: 
    *                               "error" : "Erreur lors de la creation du conseil"
    */
    router.post('/:id/advices', authMiddleware, postPlantAdvice)

    //update plant
    /**
    * @swagger
    *   /plants/{id}:
    *       patch:
    *           tags:
    *               - Plants
    *           summary: Update given plant 
    *           parameters:
    *              - in: path
    *                name: id
    *                required: true
    *                schema: 
    *                    type: integer
    *                description: Id of the plant to update 
    *           requestBody:
    *               content:
    *                   application/json:
    *                       schema:
    *                           $ref: '#/components/schemas/Plant'
    *                       example:
    *                           name: "tulip"
    *                           type: "flower"
    *                           sowing_date: "01/09/2023"
    *                           picture: "my base64 picture"
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
    *                   description: Plant not found
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: 
    *                               "error" : "Plante inexistante"
    *               '500':
    *                   description: Internal server error
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: 
    *                               "error" : "Erreur lors de la modification de la plante"
    */
    router.patch('/:id', authMiddleware, checkPlantOwnership, patchPlant)

    //delete plant
    /**
    * @swagger
    *   /plants/{id}:
    *       delete:
    *           tags:
    *               - Plants
    *           summary: delete a plant by id
    *           parameters:
    *              - in: path
    *                name: id
    *                required: true
    *                schema: 
    *                    type: integer
    *                    example: 1
    *                description: Id of the plant to delete
    *           responses:
    *               '204':
    *                   description: Plant suppressed
    *               '500':
    *                   description: Internal server error
    *                   content:
    *                       application/json:
    *                           schema:
    *                               type: string
    *                           example: Erreur lors de la suppression de la plante
    */
    router.delete('/:id', authMiddleware, checkPlantOwnership,deletePlant)

    return router
}

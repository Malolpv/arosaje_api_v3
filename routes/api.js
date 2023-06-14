const {Router} = require('express')

const {authRoutes} = require('../routes/auth')

const {usersRoutes} = require('../routes/user')
const {gardensRoutes} =require('../routes/garden')
const {plantsRoutes} =require('../routes/plant')
const {picturesRoutes} =require('../routes/picture')
const {advicesRoutes} =require('../routes/advice')
// const {missionsRoutes} =require('../routes/mission')


const apiV1 = () => { 
    const router = Router()

    router.use('/',authRoutes())
    router.use('/users',usersRoutes())
    router.use('/gardens', gardensRoutes())
    router.use('/plants', plantsRoutes())
    router.use('/pictures', picturesRoutes())
    router.use('/advices', advicesRoutes())

    return router
}


exports.api = () => {
    const router = Router()

    router.get('/',(req,res) => {
        res.status(301).redirect('http://localhost:5000/api/v1/')
    })
    router.use('/v1',apiV1())


    return router
}
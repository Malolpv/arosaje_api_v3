const {Router} = require('express')
const {usersRoutes} = require('../routes/user')




const apiV1 = () => { 
    const router = Router()

    router.use('/users',usersRoutes())

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
const express = require('express')
require('dotenv').config()

const {sequelize} = require('./sequelize/models')
const {api} = require('./routes/api')


const app = express()
const port = process.env.PORT || 5000

const connectDb = async () => {
    console.log('Checking database connection...');

    try {
        await sequelize.sync()
        await sequelize.authenticate();
        console.log('Database connection established.');
    } catch(e) {
        console.log('Database connection failed', e);
        process.exit(1);
    }
};

(async () => {
    await connectDb();

    console.log(`Attempting to run server on port ${port}`);

    //Json body parser dependency
    app.use(express.json())

    app.get('/', (req, res, next) => {
        res.status(200).send('Hello World !')
    })
    app.use('/api',api())
    app.get('*',(req,res) => {
        res.status(404).send('Not Found')
    })
    
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    });
})();
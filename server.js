//A.access to express utilities
const express = require( 'express' )
//B. set up expressmethod and call it by variable name ''app'
const app = express()
// access morgan - is a middleware, used to logs http requests
const morgan = require( 'morgan' )
//access mongoose library
const mongoose = require(' mongoose' )
//access dotenv
require('dotenv').config()
//access express-jwt
const { expressjwt } = require( 'express-jwt' )

//setup token using dotenv
process.env.SECRET

//express.json - its a middleware all requests data get parsed into json
app.use( express.json() )
app.use( morgan('dev') ) 

//setup mongoose library for schemas to be directed to routers
mongoose.connect(
    'mongodb://localhost:27017/anime',
    () => console.log('Connected to the Database')
)

//setup directed routes
app.use( '/animeAPI', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }) )

//setup error
app.use( (err, req, res, next) => {
    console.log( err )
    if( err.name === 'Unauthorized Error' ){
        res.status(err.status)
    }
    return res.send( { errMsg: err.message } )
} )

//D. Port connected and server is runnning
app.listen( 9000, () => {
    console.log( 'Local Port 9000 Connected - Server is running.' )
} )
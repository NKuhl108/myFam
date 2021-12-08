//
//  This is the starting point of the entire myFam application backend
//
//  In order to make things simpler, this essentially just sets up and starts the express application
//  and adds all the routes which are locacated in the respective routers.
//

//some includes:
const express = require('express')
require('./db/mongoose')
const hbs = require('hbs')
const path = require('path')
const userRouter = require('./routers/userRouter')
const messageRouter = require('./routers/messageRouter')
const imageRouter = require('./routers/imageRouter')
const pageRouter = require('./routers/pageRouter')
var fs = require('fs');
var Filter = require('bad-words')
filter = new Filter();
const app = express()
const port = process.env.PORT // set port to environment variable (also set in Heroku)

// setting up folders for handlebars
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
app.use(express.json())


// Here we set up all the routers:
app.use(userRouter)     //all the user endpoints
app.use(messageRouter)  //all the message endpoints
app.use(imageRouter)    // all the image endpoints
app.use(pageRouter)     // this brings up all the handlebars pages

// now start!
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


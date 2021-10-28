const express = require('express')
require('./db/mongoose')
const hbs = require('hbs')
const path = require('path')
const userRouter = require('./routers/user')
const messageRouter = require('./routers/message')
const imageRouter = require('./routers/image')
var fs = require('fs');
var Image = require('./models/image');

const auth = require('./middleware/auth')


const app = express()
const port = process.env.PORT 

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(userRouter)
app.use(messageRouter)
app.use(imageRouter)

app.get('/sendImage', (req, res) => {
    res.render('sendImage', {
        title: 'Send Image',
        name: 'Nirmala Kuhl'
    })
})

app.get('/displayImage/:id', (req, res) => {
    const _id = req.params.id
    res.render('displayImage', {
        title: 'Display Image',
        imageId: _id,
        name: 'Nirmala Kuhl'
    })
})



app.get('', (req, res) => {
    res.render('login', {
        title: 'Login',
        name: 'Nirmala Kuhl'
    })
})



app.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register',
        name: 'Nirmala Kuhl'
    })
})
app.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login',
        name: 'Nirmala Kuhl'
    })
})

app.get('/friends', (req, res) => {
    res.render('friends', {
        title: 'Friends',
        name: 'Nirmala Kuhl'
    })
})
app.get('/showMessage/:id', async (req, res) => {
    const _id = req.params.id
    res.render('showMessage', {
        title: 'Message',
        messageId: _id,
        name: 'Nirmala Kuhl',
    })
})


app.get('/imageList', (req, res) => {
    res.render('imageList', {
        title: 'MessageList',
        name: 'Nirmala Kuhl'
    })
})

app.get('/messageList', (req, res) => {
    res.render('messageList', {
        title: 'MessageList',
        name: 'Nirmala Kuhl'
    })
})
app.get('/newMessage', (req, res) => {
    res.render('newMessage', {
        title: 'New Message',
        name: 'Nirmala Kuhl'
    })
})



app.get('/pictureMessage', (req, res) => {
    res.render('pictureMessage', {
        title: 'New message',
        name: 'Nirmala Kuhl'
    })
})




app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


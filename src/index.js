const express = require('express')
require('./db/mongoose')
const hbs = require('hbs')
const path = require('path')

const userRouter = require('./routers/user')
const messageRouter = require('./routers/message')

const app = express()
const port = process.env.PORT || 3000

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


app.get('/messageList', (req, res) => {
    res.render('messageList', {
        helpText: 'This is some helpful text.',
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
// const upload = multer({ dest: "uploads/" });

// app.post("/upload_files", upload.array("files"), uploadFiles);

// function uploadFiles(req, res) {
//     console.log('asdfasdfasdfasdfasdfasdfasdfasdfasdf')
//     console.log(req.body);
//     console.log(req.files);
//     res.send('asdf')
//    // res.json({ message: "Successfully uploaded files" });
// }


// app.post("/upload_files", uploadFiles);
// function uploadFiles(req, res) {
//     console.log('asdfasdfasdfasdfasdfasdfasdfasdfasdf')
//     console.log(req.body);
// }




app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


const express = require('express')
const router = new express.Router()


// This file contains all the API endpoints for redering handlebars pages
// GET      /                   Brings up login page 
// GET      /register           Brings up registration page
// GET      /login              Brings up login page
// GET      /friends            Brings up friends list page
// GET      /messageList        Brings up message list page
// GET      /showMessage/:id    Brings up contents of a specific message based on :id (forwards id to client-side javascript)
// GET      /newMessage         Brings up new message page
// GET      /imageList          Brings up image list page
// GET      /displayImage/:id   Brings up contents of a specific image based on :id (forwards id to client-side javascript)  
// GET      /sendImage          Brings up new image page

// --------------------------------------------------------------------------------------------------




router.get('/sendImage', (req, res) => {
    res.render('sendImage', {
        title: 'Send Image',
        name: 'Nirmala Kuhl'
    })
})
router.get('/sendGreetingCard', (req, res) => {
    res.render('sendGreetingCard', {
        title: 'Send Greeting Card',
        name: 'Nirmala Kuhl'
    })
})

router.get('/displayImage/:id', (req, res) => {
    const _id = req.params.id
    res.render('displayImage', {
        title: 'Display Image',
        imageId: _id,
        name: 'Nirmala Kuhl'
    })
})

router.get('', (req, res) => {
    res.render('login', {
        title: 'Login',
        name: 'Nirmala Kuhl'
    })
})

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register',
        name: 'Nirmala Kuhl'
    })
})

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login',
        name: 'Nirmala Kuhl'
    })
})

router.get('/friends', (req, res) => {
    res.render('friends', {
        title: 'Friends',
        name: 'Nirmala Kuhl'
    })
})
router.get('/showMessage/:id', async (req, res) => {
    const _id = req.params.id
    res.render('showMessage', {
        title: 'Message',
        messageId: _id,
        name: 'Nirmala Kuhl',
    })
})

router.get('/imageList', (req, res) => {
    res.render('imageList', {
        title: 'MessageList',
        name: 'Nirmala Kuhl'
    })
})

router.get('/messageList', (req, res) => {
    res.render('messageList', {
        title: 'MessageList',
        name: 'Nirmala Kuhl'
    })
})

router.get('/newMessage', (req, res) => {
    res.render('newMessage', {
        title: 'New Message',
        name: 'Nirmala Kuhl'
    })
})







module.exports = router
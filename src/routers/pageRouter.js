const express = require('express')
const router = new express.Router()


// This file contains all the API endpoints for redering handlebars pages
// GET      /                       Brings up login page 
// GET      /register               Brings up registration page
// GET      /login                  Brings up login page
// GET      /logout                 Brings up logout page
// GET      /friends                Brings up friends list page
// GET      /messageList            Brings up message list page
// GET      /showMessage/:id        Brings up contents of a specific message based on :id (forwards id to client-side javascript)
// GET      /newMessage             Brings up new message page
// GET      /adminMessageList       Brings up admin message list page
// GET      /adminImageList         Brings up admin image list page
// GET      /adminShowMessage/:id   Brings up contents of a specific message based on :id for admin
// GET      /adminDisplayImage/:id  Brings up contents of a specific image based on :id for admin
// GET      /sendImage              Brings up new image page
// GET      /sendGreetingCard       Brings up send greeting card page
// GET      /imageList              Brings up image list page
// GET      /displayImage/:id       Brings up contents of a specific image based on :id (forwards id to client-side javascript)  
// GET      /credits                Brings up credit page which display how many credits a user has  

// ------------------------------------------------------------------------------------------------------------------------



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

router.get('/logout', (req, res) => {
    res.render('logout', {
        title: 'Logout',
        name: 'Nirmala Kuhl'
    })
})

router.get('/friends', (req, res) => {
    res.render('friends', {
        title: 'Friends - Only non-inmates can add friends',
        name: 'Nirmala Kuhl'
    })
})

router.get('/messageList', (req, res) => {
    res.render('messageList', {
        title: 'Message List',
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
router.get('/newMessage', (req, res) => {
    res.render('newMessage', {
        title: 'New Message - Cost: 1 credit',
        name: 'Nirmala Kuhl'
    })
})
router.get('/adminMessageList', (req, res) => {
    res.render('adminMessageList', {
        title: 'Admin Message List',
        name: 'Nirmala Kuhl'
    })
})

router.get('/adminImageList', (req, res) => {
    res.render('adminImageList', {
        title: 'Admin Image List',
        name: 'Nirmala Kuhl'
    })
})
router.get('/adminShowMessage/:id', async (req, res) => {
    const _id = req.params.id
    res.render('adminShowMessage', {
        title: 'Message',
        messageId: _id,
        name: 'Nirmala Kuhl',
    })
})
router.get('/adminDisplayImage/:id', (req, res) => {
    const _id = req.params.id
    res.render('adminDisplayImage', {
        title: 'Display Image',
        imageId: _id,
        name: 'Nirmala Kuhl'
    })
})

router.get('/sendImage', (req, res) => {
    
    res.render('sendImage', {
        title: 'Send Image',
        name: 'Nirmala Kuhl'
    })
})
router.get('/sendGreetingCard', (req, res) => {
    res.render('sendGreetingCard', {
        title: 'Send Greeting Card - Cost: 2 credits',
        name: 'Nirmala Kuhl'
    })
})
router.get('/imageList', (req, res) => {
    res.render('imageList', {
        title: 'Image List',
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

router.get('/credits', (req, res) => {
    res.render('credits', {
        title: 'Credits',
        name: 'Nirmala Kuhl',
        stripePublishableKey: process.env.stripePublishableKey
    })
})




module.exports = router
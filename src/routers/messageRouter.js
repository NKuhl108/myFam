const express = require('express')
const Message = require('../models/message')
const auth = require('../middleware/auth')
const router = new express.Router()
const User = require('../models/user')
const multer = require('multer')

var Filter = require('bad-words')
filter = new Filter()

// This file contains all the API endpoints for messages:

// POST     /messages       saves a new message to the database 
// GET      /messages       returns the list of all messages to the current user
// GET      /adminMessages  returns ALL messages for admin users
// GET      /messages/:id   returns a specific message object based on :id
// DELETE   /messages/:id   delete message based on :id
// 
// --------------------------------------------------------------------------------------------------





// POST     /messages       saves a new message to the database
router.post('/messages', auth, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.recipient })
        const recipientID = user._id

        const message = new Message({
            subject: req.body.subject,
            content: req.body.content,
            owner: req.user._id,
            recipient:recipientID
        })

        await message.save()
        res.send(message)
    } catch (e) {
        res.status(500).send({ error: 'Could not find recipient in database' })
    }

})







// this is needed to modify the return list with author names. need to work with promises here
function execSequentially (arr, func) {
    return arr.reduce(
        (accumulator, current) => accumulator.then(() => func(current)), 
        Promise.resolve());
}


const fetchAuthorname = async (message) => {
    try {
        const author = await User.findOne({_id: message.owner})
        return author.name
    } catch (e) {
        res.status(401).send({ error: 'error' })
    }
}

router.get('/adminMessages', auth, async (req, res) => {

    returnMessageList=[]

    console.log('a')
    try {
        if (req.user.isAdmin==true){
            let messageList = await Message.find()
            for await (const message of messageList){
                let senderUser = await User.findOne({ _id: message.owner })
                let recipientUser = await User.findOne({ _id: message.recipient })
  
                const mess = {
                    _id: message._id,
                    subject: filter.clean(message.subject),
                    content: filter.clean(message.content),
                    owner: message.owner,
                    authorName: senderUser.name,
                    recipientName: recipientUser.name,
                    isDeleted: message.isDeleted
                }

                returnMessageList.push(mess)

            }
        }
        console.log('b')
        res.send(returnMessageList)
    } catch (e) {
        res.status(500).send()
    }
})


router.get('/messages', auth, async (req, res) => {
    returnMessageList=[]
    
    try {
        //okay here some dark magic to populate the author name of messages
        await req.user.populate('messages').execPopulate()
        await execSequentially(req.user.messages, async (item) => {
            const nam = await fetchAuthorname(item)

            const mess = {
                _id: item._id,
                subject: filter.clean(item.subject),
                content: filter.clean(item.content),
                owner: item.owner,
                authorName: nam,
            }
            if (item.isDeleted == false){
                returnMessageList.push(mess)
            }
        }
        );
      
      
        res.send(returnMessageList)
    } catch (e) {
        res.status(500).send()
    }
})


router.get('/messages/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        let message = await Message.findOne({ _id, recipient: req.user._id })
        if(req.user.isAdmin == true){
            message = await Message.findOne({ _id }) //admin can read any message
        }

        message.subject = filter.clean(message.subject)
        message.content = filter.clean(message.content)
        if (!message) {
            return res.status(404).send()
        }

        res.send(message)
    } catch (e) {
        res.status(500).send()
    }
})


router.delete('/messages/:id', auth, async (req, res) => {

    try { 
        const messageIdToDelete = req.params.id
        await Message.updateOne({_id: messageIdToDelete}, {$set: {'isDeleted': true}});
        res.status(200).send(messageIdToDelete)
    } catch (e) {
        res.status(500).send()
    }
})
router.patch('/messages/:id', auth, async (req, res) => {

    try { 
        const messageIdToDelete = req.params.id
        await Message.updateOne({_id: messageIdToDelete}, {$set: {'isDeleted': false}});
        res.status(200).send(messageIdToDelete)
    } catch (e) {
        res.status(500).send()
    }



})

router.delete('/messages/:id', auth, async (req, res) => {
    try {
        const message = await Message.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!message) {
            res.status(404).send()
        }

        res.send(message)
    } catch (e) {
        res.status(500).send()
    }
})


const upload = multer({ dest: "public/uploads/" });

module.exports = router
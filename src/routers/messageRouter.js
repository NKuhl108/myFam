const express = require('express')
const Message = require('../models/message')
const auth = require('../middleware/auth')
const router = new express.Router()
const User = require('../models/user')
const multer = require('multer')




// This file contains all the API endpoints for messages:

// POST     /messages       saves a new message to the database 
// GET      /messages       returns the list of all messages to the current user
// GET      /messages/:id   returns a specific message object based on :id
// DELETE   /messages/:id   delete message based on :id
// 
// --------------------------------------------------------------------------------------------------






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

router.get('/messages', auth, async (req, res) => {
    returnMessageList=[]
    
    try {
        //okay here some dark magic to populate the author name of messages
        await req.user.populate('messages').execPopulate()
        await execSequentially(req.user.messages, async (item) => {
            const nam = await fetchAuthorname(item)

            const mess = {
                _id: item._id,
                subject: item.subject,
                content: item.content,
                owner: item.owner,
                authorName: nam,
            }

            returnMessageList.push(mess)
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
        const message = await Message.findOne({ _id, recipient: req.user._id })
        
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
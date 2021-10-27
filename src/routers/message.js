const express = require('express')
const Message = require('../models/message')
const auth = require('../middleware/auth')
const router = new express.Router()
const User = require('../models/user')
const multer = require('multer')
router.post('/messages', auth, async (req, res) => {
    console.log('trying to save message in /messages')
    try {
        const user = await User.findOne({ email: req.body.recipient })
        console.log(user)
        const recipientID = user._id

        const message = new Message({
            subject: req.body.subject,
            content: req.body.content,
            owner: req.user._id,
            recipient:recipientID
        })
        console.log(message)

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
        console.log(author.name)
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
        // const message = await Message.findOne({$or: [
        //                                                 {recipient: req.user._id},
        //                                                 {owner: req.user._id}
        //                                             ]})
        
        if (!message) {
            return res.status(404).send()
        }

        res.send(message)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/messages/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['content']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const message = await Message.findOne({ _id: req.params.id, owner: req.user._id})

        if (!message) {
            return res.status(404).send()
        }

        updates.forEach((update) => message[update] = req.body[update])
        await message.save()
        res.send(message)
    } catch (e) {
        res.status(400).send(e)
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


const uploadFiles = async (req, res) => {
    console.log('####################################################')
    console.log('Message recipient:' + req.body.recipient)
    console.log('Message subject:' + req.body.subject)
    console.log('Message content:' + req.body.content)
    console.log('Owner Id:' + req.body.owner)
    console.log(req.files);
    
    console.log('trying to save messages')
    try {
        
        const user = await User.findOne({ email: req.body.recipient })
        const recipientID = user._id
        console.log('---------------------------------------------')
        console.log('req.files')
        console.log(req.files)
        const message = new Message({
            subject: req.body.subject,
            content: req.body.content,
            owner: req.body.owner,
            recipient:recipientID,
            image: {path: req.files[0].path}
        })


        console.log(message)
        await message.save()
        res.send(message)
    } catch (e) {
        res.status(500).send({ error: 'Could not find recipient in database' })
    }


}

router.post("/upload_files", upload.array("files"), uploadFiles);
module.exports = router
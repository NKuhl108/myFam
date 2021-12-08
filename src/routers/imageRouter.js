const express = require('express')
require('../db/mongoose')
const hbs = require('hbs')
const path = require('path')
var fs = require('fs');
var Image = require('../models/image');
var ImageMessage = require('../models/imageMessage');
var multer = require('multer');
const auth = require('../middleware/auth')
const User = require('../models/user')
const router = new express.Router()
var Filter = require('bad-words')
filter = new Filter()

// This file contains all the API endpoints for images:

// POST /sendGreetingCard   Used to send a new greeting card
// POST /sendImage          Used to send a new image (upload and write to database)
// GET /image/:id           Returns an image object from the database based on :id. (includes authentication)
// GET /images              Gets a list of all the images that were sent to the user (also loads sendername in to display it)
// GET /adminImages         Gets admin list of all the images 
// GET /greetingCards       Gets a list of all the greeting cards
// DELETE /image/:id        Deletes an image message (just hidden by setting "isDeleted" flag)
// PATCH /image/:id         Undeletes an image message (just hidden by setting "isDeleted" flag)

// --------------------------------------------------------------------------------------------------


const imageMessageCost=2


// used to upload image with multer before committing to the database
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });


// Used to send a new greeting card
router.post('/sendGreetingCard', auth, async (req, res) => {
    if (req.user.credits>=imageMessageCost){
        req.user.subtractCredits(imageMessageCost)

        const recipient = await User.findOne({email: req.body.recipient})

        var newImageMessageObject = {
            owner: req.user._id,
            recipient: recipient._id,
            name: filter.clean(req.body.name),
            desc: filter.clean(req.body.desc),
            imageData: req.body.cardId
        }

        ImageMessage.create(newImageMessageObject, (err, item) => {
            if (err) {
                console.log('sendImage error');
            }
            else {
                res.send(newImageMessageObject)
            }
        }); 
    }
    else{
        res.status(500).send({ error: 'You don\'t have enough credits' })

    }   
});


// Used to send a new image (upload and write to database)
router.post('/sendImage', auth, upload.single('image'), async (req, res, next) => {
    if (req.user.credits>=imageMessageCost){
        req.user.subtractCredits(imageMessageCost)
    
    const recipient = await User.findOne({email: req.body.recipient})
    
    var newImageObject = {
        data: fs.readFileSync(path.join(__dirname , '..','..','uploads/' + req.file.filename)),
        contentType: 'image/png'
    }

        Image.create(newImageObject, (err, item) => {
            if (err) {
                console.log('sendImage error');
            }
            else {
                //console.log(item)
                console.log('we are creating a new image now')
                var newImageMessageObject = {
                    owner: req.user._id,
                    recipient: recipient._id,
                    name: filter.clean(req.body.name),
                    desc: filter.clean(req.body.desc),
                    imageData: item._id
                }

                ImageMessage.create(newImageMessageObject, (err, item) => {
                    if (err) {
                        res.status(500).send('failure!')
                    }
                    else {
                        res.status(301).send(newImageMessageObject)
                    }
                });    
            }
        });
    }
    else{
        res.status(500).send({ error: 'You dont have enough credits' })
    }  
});

// endpoint to return specific image based on id. with authentication
router.get('/image/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const imageMessage = await ImageMessage.findOne({ _id})
        
        if (!imageMessage) {
            return res.status(404).send()
        }

        // after imageMessage was retrieved, now get the image that belongs to it      
        const image = await Image.findOne({_id: imageMessage.imageData})
 
        if (!image) {
            return res.status(404).send()
        }
            res.send({
            contentType: image.contentType, 
            data: image.data.toString('base64'),
            name: imageMessage.name,
            desc: imageMessage.desc
        })

    } catch (e) {
        res.status(500).send()
    }
})

// used to run the for each loop with asynchronous steps
function execSequentially (arr, func) {
    return arr.reduce(
        (accumulator, current) => accumulator.then(() => func(current)), 
        Promise.resolve());
}

// helper function to fetch the sender name for image
const fetchAuthorname = async (image) => {
    try {
        const author = await User.findOne({_id: image.owner})
        return author.name
    } catch (e) {
        res.status(401).send({ error: 'error' })
    }
}

// helper function to fetch the sender name for a user id
const fetchAuthornameWithId = async (userid) => {
    try {
        const author = await User.findOne({_id: userid})
        return author.name
    } catch (e) {
        res.status(401).send({ error: 'error' })
    }
}

// Gets a list of all the images that were sent to the user (also loads sendername in to display it)
router.get('/images', auth, async (req, res) => {
    returnImageList=[]
    try {
        console.log('trying to populate users image list')
        await req.user.populate('images').execPopulate()
        console.log('done populating users image list')

        await execSequentially(req.user.images, async (item) => {
            const nam = await fetchAuthorname(item)
            
            const image = {
                _id: item._id,
                name: item.name,
                desc: item.desc,
                owner: item.owner,
                authorName: nam,
                img: item.img

            }
            if (item.isDeleted == false){
                returnImageList.push(image)

            }
        }
        );
        res.send(returnImageList)
    } catch (e) {
        res.status(500).send()
    }
})

// Gets admin list of all the images 
router.get('/adminImages', auth, async (req, res) => {
    returnImageList=[]
    try {
            if (req.user.isAdmin==true){
            imageList = await ImageMessage.find()
            
            for await (const imageMessage of imageList){
                
                const nam = await fetchAuthornameWithId(imageMessage.owner)
                const rnam = await fetchAuthornameWithId(imageMessage.recipient)
                const image = {
                    _id: imageMessage._id,
                    name: imageMessage.name,
                    desc: imageMessage.desc,
                    owner: imageMessage.owner,
                    authorName: nam,
                    recipientName: rnam,
                    img: imageMessage.img,
                    isDeleted:imageMessage.isDeleted

                }
                returnImageList.push(image)
            }
        }
        
        res.send(returnImageList)
    } catch (e) {
        res.status(500).send()
    }
})

// Gets a list of all the greeting cards
router.get('/greetingCards', auth, async (req, res) => {
    returnImageList=[]
    try {
        console.log('trying to populate users image list')
        await req.user.populate('images').execPopulate()
        console.log('done populating users image list')
        const greetingCardImages = await Image.find({isGreetingCard: true})
        var convertedGreetingCards = []

        greetingCardImages.forEach((card)=>{
            convertedGreetingCards.push({
                _id: card._id,
                contentType: card.contentType, 
                data: card.data.toString('base64'),
            })
        })

        console.log(convertedGreetingCards)
        
        res.send(convertedGreetingCards)    

    } catch (e) {
        res.status(500).send()
    }
})


// Deletes an image message (just hidden by setting "isDeleted" flag)
router.delete('/image/:id', auth, async (req, res) => {
    console.log("deleting image")
    try { 
        if (req.user.isAdmin==true){
            const imageMessagetoDelete = req.params.id
            await ImageMessage.updateOne({_id: imageMessagetoDelete}, {$set: {'isDeleted': true}});
            res.status(200).send(messageIdToDelete)
        }
    } catch (e) {
        res.status(500).send()
    }
})

// Undeletes an image message (just hidden by setting "isDeleted" flag)
router.patch('/image/:id', auth, async (req, res) => {
    console.log("deleting image")
    try { 
        const imageMessagetoDelete = req.params.id
        await ImageMessage.updateOne({_id: imageMessagetoDelete}, {$set: {'isDeleted': false}});
        res.status(200).send(messageIdToDelete)
    } catch (e) {
        res.status(500).send()
    }
})




module.exports = router
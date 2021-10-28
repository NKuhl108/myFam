const express = require('express')
require('../db/mongoose')
const hbs = require('hbs')
const path = require('path')
var fs = require('fs');
var Image = require('../models/image');
var multer = require('multer');
const auth = require('../middleware/auth')
const User = require('../models/user')

const router = new express.Router()




var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });



router.post('/sendImage', auth, upload.single('image'), async (req, res, next) => {
    console.log('a')

    const recipient = await User.findOne({email: req.body.recipient})



    console.log(path.join(__dirname , '..','..','uploads/' + req.file.filename))
    //console.log(path.join(__dirname + '../'+'../uploads/' + req.file.filename))
    var obj = {
        owner: req.user._id,
        recipient: recipient._id,
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname , '..','..','uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    Image.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            //res.redirect('/imageSendResult');
            res.send('success!')
        }
    });
});

// endpoint to return specific image based on id. with authentication
router.get('/image/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const image = await Image.findOne({ _id})
        // const message = await Message.findOne({$or: [
        //                                                 {recipient: req.user._id},
        //                                                 {owner: req.user._id}
        //                                             ]})
        
        if (!image) {
            return res.status(404).send()
        }
        console.log('---backend image image.img.data  ----')
        console.log(image.img.data)
        res.send({
            contentType: image.img.contentType, 
            data: image.img.data.toString('base64'),
            name: image.name,
            desc: image.desc
        })

    } catch (e) {
        res.status(500).send()
    }
})

function execSequentially (arr, func) {
    return arr.reduce(
        (accumulator, current) => accumulator.then(() => func(current)), 
        Promise.resolve());
}


const fetchAuthorname = async (image) => {
    try {
        const author = await User.findOne({_id: image.owner})
        return author.name
    } catch (e) {
        res.status(401).send({ error: 'error' })
    }
}

router.get('/images', auth, async (req, res) => {
    returnImageList=[]
    
    try {
        console.log('1111')
        await req.user.populate('images').execPopulate()

        console.log('2222')

        await execSequentially(req.user.images, async (item) => {
            console.log('3333')
            const nam = await fetchAuthorname(item)
            console.log('4444')
            console.log(nam)
            
            const image = {
                _id: item._id,
                name: item.name,
                desc: item.desc,
                owner: item.owner,
                authorName: nam,
                img: item.img

            }
            console.log(image)
            returnImageList.push(image)
        }
        );
      
      
        res.send(returnImageList)
    } catch (e) {
        res.status(500).send()
    }
})




module.exports = router
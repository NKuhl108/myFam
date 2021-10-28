const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})
router.post('/users/addfriend', auth, async (req, res) => {


    if (req.user.email == req.body.email){
        res.send({error: "Error: not possible to add yourself as friend"})
    }
    try {
        if (req.user.inmate){
            throw new Error()
        }

        const requestedFriend = await User.findOne({email: req.body.email})
        if (!requestedFriend.inmate){
            throw new Error()
        }
        const foundFriend = req.user.friends.find(x => x == requestedFriend._id);
        if (foundFriend != undefined){
            throw new Error()
        }
        // success case. add friend and save user
        req.user.friends = req.user.friends.concat( requestedFriend._id)
        await req.user.save()

        requestedFriend.friends = requestedFriend.friends.concat( req.user._id)
        await requestedFriend.save()

        res.send(req.user)

    } catch (e) {
        res.status(400).send({error: 'unable to add as friend'})
    }


})
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
        
    } catch (e) {
        res.status(400).send(e)
    }

})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.get('/users/friends', auth, async (req, res) => {
            await req.user.populate('friends').execPopulate()
            let returnList=[]
            //only return non-sensitive information
            req.user.friends.forEach(element => {
                returnList.push({
                    _id: element._id,
                    name: element.name,
                    email: element.email

                })

            })

            res.send(returnList)
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
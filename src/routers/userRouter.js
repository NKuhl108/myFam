const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const { default: Stripe } = require('stripe')
const router = new express.Router()



// This file contains all the API endpoints for users:

// POST     /users              saves a new user to the database 
// POST     /users/addfriend    adds a new friend connection
// POST     /users/login        processes user login attempt (if successful, sends token back)
// POST     /users/logout       logs out user session (current token only)
// POST     /users/logoutAll    logs out all sessions for this user (all tokens)
// GET      /users/me           returns user object of current user
// GET      /users/credits      returns the credits for the current user
// GET      /users/friends      returns friends list for current user
// DELETE   /users/me           delete current user
// --------------------------------------------------------------------------------------------------


// note: most of these functions make use of the "auth" middleware function which automatically checks the toek
// and also provides access to the current user in req.user

const creditPurchaseAmout = 10
const stripe = require('stripe')(process.env.stripeSecretKey)


// process payment here
router.post('/charge', async (req, res) => {

    const userObject = await User.findOne({email: req.body.stripeEmail})

    if (userObject){
        const amount = creditPurchaseAmout*100;
        
        stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
        })
        .then(customer => stripe.charges.create({
            amount,
            description: 'MyFam credits',
            currency: 'usd',
            customer: customer.id 
        }))
        .then(charge => {
            //now make sure to save the new credits to user account
            userObject.credits = userObject.credits+creditPurchaseAmout
            userObject.save()
            console.log('purchase successful')
            res.render('successcredit')
        });
    }
    else{
        res.render('failcredit')
    }




  });


// saves a new user to the database
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


// adds a new friend connection
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

// processes user login attempt (if successful, sends token back)
router.post('/users/login', async (req, res) => {
    try {
        //get user from the database
        const user = await User.findByCredentials(req.body.email, req.body.password)
        //make a new token for this user and then send it back
        //note: token also gets stored in the token list for this user
        const token = await user.generateAuthToken()

        res.send({ user, token })
        
    } catch (e) {
        res.status(400).send(e)
    }

})

// logs out user session (current token only)
router.post('/users/logout', auth, async (req, res) => {
    try {
        //find current token in user's token list and filter it out
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        //save user without that token (note: other tokens still work)
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

//  logs out all sessions for this user (all tokens)
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        // delete the token list
        req.user.tokens = []
        // and now save user to database without any tokens
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// returns user object of current user
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// returns the credits for the current user
router.get('/users/credits', auth, async (req, res) => {
    res.send({credits: req.user.credits})
})



// returns friends list for current user
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


// delete current user
// note: this is not used anywhere. Even if a user is deleted, they should probably just be hidden
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
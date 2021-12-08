const jwt = require('jsonwebtoken')
const User = require('../models/user')

//this gets put in the middle every time someone calls a protected endpoint.
//cool thing: it also gives us access to this user then.
const auth = async (req, res, next) => {
    try {
        // first we grab the token from the incoming HTTP request
        const token = req.header('Authorization').replace('Bearer ', '')
        // then we check the token
        const decoded = jwt.verify(token, 'thisismycapstone')
        // now we load this user from the database so we can return it later
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        
        next() // keep going with the next operation. Usually the actual API endpoint that was originally called
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth
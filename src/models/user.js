const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Message = require('./message')
const Image = require('./image')
const ImageMessage = require('./imageMessage')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    inmate: {
        type: Boolean,
        default: true,//because more restrictive
    },
    isAdmin: {
        type: Boolean,
        default: false,//because more restrictive
    },
    credits: {
        type: Number,
        default: 5,
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})
// virtual property to find messages addressed to this user
userSchema.virtual('messages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'recipient'
})


userSchema.virtual('images', {
    ref: 'ImageMessage',
    localField: '_id',
    foreignField: 'recipient'
})
// userSchema.virtual('friendObjects', {
//     ref: 'User',
//     localField: '_id',
//     foreignField: 'owner'
// })

// this function is to hide sensitive content when returning user objects
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismycapstone')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}
userSchema.methods.addCredits = async function (additionalCredits) {
    returnValue = false
    if (additionalCredits >= 0){
        const user = this
        user.credits = user.credits + additionalCredits
        await user.save()
        returnValue = true
    }


    return returnValue
}
userSchema.methods.subtractCredits = async function (minusCredits) {
    returnValue = false
    const user = this
    if ((minusCredits >= 0) && (user.credits >= minusCredits) ) {
        
        user.credits = user.credits - minusCredits
        await user.save()
        returnValue = true
    }


    return returnValue
}


userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Delete user messages when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Message.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
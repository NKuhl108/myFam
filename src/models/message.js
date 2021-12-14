const mongoose = require('mongoose')
const User = require('./user')

// This file defines the "Message" model for the database and determines how messages are saved.
// this is pretty straight-forward because we don't have any functions here
const messageSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    image: {
        path: {
            type: String,
            required: false
        }
    }
})
messageSchema.virtual('sender', {
    ref: 'User',
    localField: 'owner',
    foreignField: '_id'
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
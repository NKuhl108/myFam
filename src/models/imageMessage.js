

var mongoose = require('mongoose');



// This file defines the database model for image messages.
// Note that the image data is not actually part of this data structure.
// Instead, we just have a reference to the actual "Image"

var imageMessageSchema = new mongoose.Schema({
    

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    imageData: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Image'
    },

    
    name: String,
    desc: String

});
module.exports = new mongoose.model('ImageMessage', imageMessageSchema);
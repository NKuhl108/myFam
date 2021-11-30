

var mongoose = require('mongoose');

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
    desc: String//,

});
module.exports = new mongoose.model('ImageMessage', imageMessageSchema);
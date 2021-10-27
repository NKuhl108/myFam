

var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    

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

    
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});
module.exports = new mongoose.model('Image', imageSchema);
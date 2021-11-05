

var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    
    data: Buffer,
    contentType: String,
    isGreetingCard: {
        type: Boolean,
        default: false,//greeting cards only created by admin. so we are not putting true in here now
    },
});
module.exports = new mongoose.model('Image', imageSchema);
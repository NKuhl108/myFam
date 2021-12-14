

var mongoose = require('mongoose');

// This file defines the database model for image data
// these pieces of image data are then referenced by image messages.
// note: multiple image messages can point to the same "Image" (greeting cards)

var imageSchema = new mongoose.Schema({
    
    data: Buffer,
    contentType: String,
    isGreetingCard: {
        type: Boolean,
        default: false,//greeting cards only created by admin. so we are not putting true in here now
    },
});
module.exports = new mongoose.model('Image', imageSchema);
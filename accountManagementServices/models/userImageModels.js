const mongoose = require('mongoose');

// User Image Schema
const userImageSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    data: {
        type: Buffer,
        required: true
    },
    contentType: {
        type: String,
        required: true
    }
});

// Create UserImage
const userImage = new mongoose.model('UserImage', userImageSchema);

module.exports = userImage;

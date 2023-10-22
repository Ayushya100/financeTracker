const mongoose = require('mongoose');

// User Image Schema
const userImageSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    profileImage: {
        data: {
            type: Buffer,
            required: false
        },
        contentType: {
            type: String,
            required: false
        }
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now()
    },
    createdBy: {
        type: String,
        required: false,
        trim: true,
        default: "SYSTEM"
    },
    modifiedOn: {
        type: Date,
        required: true,
        default: Date.now()
    },
    modifiedBy: {
        type: String,
        required: true,
        trim: true,
        default: "SYSTEM"
    }
});

// Create UserImage
const userImage = new mongoose.model('UserImage', userImageSchema);

module.exports = userImage;

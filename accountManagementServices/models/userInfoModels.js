const mongoose = require('mongoose');

// User Info Schema
const userInfoSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: false,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trime: true
    },
    bio: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    dob: {
        type: Date,
        required: false
    },
    occupation: {
        type: String,
        required: false
    },
    contactNumber: {
        type: Number,
        required: false,
        unique: true,
        length: 10,
        trim: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now()
    },
    modifiedOn: {
        type: Date,
        required: true,
        default: Date.now()
    },
    lastLogin: {
        type: Date,
        required: false
    },
    isDeleted: {
        type: Boolean,
        required: false,
        default: false
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    verificationCode: {
        type: String,
        required: false
    },
    token: {
        type: String,
        required: false
    }
});

// Create UserInfo
const userInfo = new mongoose.model('UserInfo', userInfoSchema);

module.exports = userInfo;

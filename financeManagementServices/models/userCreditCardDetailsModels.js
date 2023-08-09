const mongoose = require('mongoose');

// User Credit Card Details Schema
const userCreditCardDetailSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    creditCardId: {
        type: String,
        required: true
    },
    creditCategoryName: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        default: 0,
        required: true
    },
    reason: {
        type: String,
        required: false
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    modifiedOn: {
        type: Date,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

// Create User Credit Card Details
const userCreditCardDetails = new mongoose.Model('userCreditCardDetails', userCreditCardDetailSchema);

module.exports = userCreditCardDetails;

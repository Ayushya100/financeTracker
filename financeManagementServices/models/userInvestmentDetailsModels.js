const mongoose = require('mongoose');

// User Investment Details Schema
const userInvestmentDetailsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    investmentId: {
        type: String,
        required: true
    },
    investCategoryName: {
        type: String,
        required: true
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

// Create User Investment Details
const userInvestmentDetails = new mongoose.Model('userInvestmentDetails', userInvestmentDetailsSchema);

module.exports = userInvestmentDetails;

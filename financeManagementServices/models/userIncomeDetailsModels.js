const mongoose = require('mongoose');

// User Income Details Schema
const userIncomeDetailsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    incomeId: {
        type: String,
        required: true
    },
    incomeCategoryName: {
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

// Create User Income Details
const userIncomeDetails = new mongoose.model('userIncomeDetails', userIncomeDetailsSchema);

module.exports = userIncomeDetails;

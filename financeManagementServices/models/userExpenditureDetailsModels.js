const mongoose = require('mongoose');

// User Expenditure Details Schema
const userExpenditureDetailSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    expenditureId: {
        type: String,
        required: true
    },
    expCategoryName: {
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

// Create User Expenditure Details
const userExpenditureDetails = new mongoose.model('userExpenditureDetails', userExpenditureDetailSchema);

module.exports = userExpenditureDetails;

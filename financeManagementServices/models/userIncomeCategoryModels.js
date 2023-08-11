const mongoose = require('mongoose');

// Create Income Category Schema
const userIncomeCategorySchema = new mongoose.Schema({
    userId: {
        type: String,
        required : true
    },
    incomeCategoryName: {
        type: String,
        trim: true,
        required: true
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

// Create User Income Category
const userIncomeCategory = new mongoose.Model('userIncomeCategory', userIncomeCategorySchema);

module.exports = userIncomeCategory;

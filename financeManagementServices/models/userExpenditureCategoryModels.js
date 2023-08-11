const mongoose = require('mongoose');

// User Expenditure Category Schema
const userExpenditureCategorySchema = new mongoose.Schema({
    userId: {
        type: String,
        required : true
    },
    expCategoryName: {
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

// Create User Expenditure Category
const userExpenditureCategory = new mongoose.Model('userExpenditureCategory', userExpenditureCategorySchema);

module.exports = userExpenditureCategory;

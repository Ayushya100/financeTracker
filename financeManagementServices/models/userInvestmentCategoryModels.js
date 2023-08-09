const mongoose = require('mongoose');

// User Investment Category Schema
const userInvestmentCategorySchema = new mongoose.Schema({
    userId: {
        type: String,
        required : true
    },
    investCategoryName: {
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

// Create User Investment Category
const userInvestmentCategory = new mongoose.Model('userInvestmentCategory', userInvestmentCategorySchema);

module.exports = userInvestmentCategory;

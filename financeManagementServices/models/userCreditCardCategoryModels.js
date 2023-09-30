const mongoose = require('mongoose');

// User Credit Card Category Schema
const creditCardCategorySchema = new mongoose.Schema({
    userId: {
        type: String,
        required : true
    },
    creditCategoryName: {
        type: String,
        trim: true,
        required: true
    },
    creditCategoryNote: {
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

// Create User Credit Card Category
const userCreditCardCategory = new mongoose.Model('userCreditCardCategory', creditCardCategorySchema);

module.exports = userCreditCardCategory;

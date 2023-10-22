const mongoose = require('mongoose');

// User Finance Schema
const userFinanceSchema = new mongoose.Schema({
    userId: {
        type : String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    availableFunds: {
        type: Number,
        default: 0,
        minlength: 1,
        required: false
    },
    lifetimeIncome: {
        type: Number,
        default: 0,
        minlength: 1,
        required: false
    },
    lifetimeInvestment: {
        type: Number,
        default: 0,
        minlength: 1,
        required: false
    },
    lifetimeExpenditure: {
        type: Number,
        default: 0,
        minlength: 1,
        required: false
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

// Create UserFinance
const userFinance = new mongoose.model('userBasicFinance', userFinanceSchema);

module.exports = userFinance;

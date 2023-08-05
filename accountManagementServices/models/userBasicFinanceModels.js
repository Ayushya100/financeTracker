const mongoose = require('mongoose');

// User Finance Schema
const userFinanceSchema = new mongoose.Schema({
    userId: {
        type : String,
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
    }
});

// Create UserFinance
const userFinance = new mongoose.model('userBasicFinance', userFinanceSchema);

module.exports = userFinance;

const mongoose = require('mongoose');

// User Dashboard Settings Schema
const userDashboardSettingsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    expBarChart: {
        type: Boolean,
        required: false,
        default: true
    },
    expPieChart: {
        type: Boolean,
        required: false,
        default: true
    },
    creditBarChart: {
        type: Boolean,
        required: false,
        default: true
    },
    creditPieChart: {
        type: Boolean,
        required: false,
        default: true
    },
    fundsBarChart: {
        type: Boolean,
        required: false,
        default: true
    },
    fundsPieChart: {
        type: Boolean,
        required: false,
        default: true
    },
    investBarChart: {
        type: Boolean,
        required: false,
        default: true
    },
    investPieChart: {
        type: Boolean,
        required: false,
        default: true
    },
    perDayExpBarChart: {
        type: Boolean,
        required: false,
        default: true
    },
    perDayExpPieChart: {
        type: Boolean,
        required: false,
        default: true
    },
    perDayCreditBarChart: {
        type: Boolean,
        required: false,
        default: true
    },
    perDayCreditPieChart: {
        type: Boolean,
        required: false,
        default: true
    },
    perDayInvestBarChart: {
        type: Boolean,
        required: false,
        default: true
    },
    perDayInvestPieChart: {
        type: Boolean,
        required: false,
        default: true
    },
    perDayIncomeBarChart: {
        type: Boolean,
        required: false,
        default: true
    },
    perDayIncomePieChart: {
        type: Boolean,
        required: false,
        default: true
    },
    perDaySpendReport: {
        type: Boolean,
        required: false,
        default: true
    },
    perDayIncomeReport: {
        type: Boolean,
        required: false,
        default: true
    },
    perDayInvestReport: {
        type: Boolean,
        required: false,
        default: true
    },
    perDayTotalReport: {
        type: Boolean,
        required: false,
        default: true
    },
    monthExpBarChart: {
        type: Boolean,
        required: false,
        default: true
    },
    monthExpPieChart: {
        type: Boolean,
        required: false,
        default: true
    },
    monthExpLineChart: {
        type: Boolean,
        required: false,
        default: true
    },
    monthCreditBarChart: {
        type: Boolean,
        required: false,
        default: true
    },
    monthCreditPieChart: {
        type: Boolean,
        required: false,
        default: true
    },
    monthCreditLineChart: {
        type: Boolean,
        required: false,
        default: true
    },
    monthInvestBarChart: {
        type: Boolean,
        required: false,
        default: true
    },
    monthInvestPieChart: {
        type: Boolean,
        required: false,
        default: true
    },
    monthInvestLineChart: {
        type: Boolean,
        required: false,
        default: true
    },
    monthIncomeBarChart: {
        type: Boolean,
        required: false,
        default: true
    },
    monthIncomePieChart: {
        type: Boolean,
        required: false,
        default: true
    },
    monthIncomeLineChart: {
        type: Boolean,
        required: false,
        default: true
    },
    monthSpendReport: {
        type: Boolean,
        required: false,
        default: true
    },
    monthIncomeReport: {
        type: Boolean,
        required: false,
        default: true
    },
    monthInvestReport: {
        type: Boolean,
        required: false,
        default: true
    },
    monthTotalReport: {
        type: Boolean,
        required: false,
        default: true
    }
});

// User Dashboard model
const userDashboardSettings = new mongoose.model('userDashboardSettings', userDashboardSettingsSchema);

module.exports = userDashboardSettings;

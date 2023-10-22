const mongoose = require('mongoose');

// User Dashboard Settings Schema
const userDashboardSettingsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userName: {
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
    customExpBarChart: {
        type: Object,
        default: {daily: true, lastMonth: true, last3Month: true, last6Month: true, lastYear: true, custom: true},
        required: false
    },
    customExpPieChart: {
        type: Object,
        default: {daily: true, lastMonth: true, last3Month: true, last6Month: true, lastYear: true, custom: true},
        required: false
    },
    customExpLineChart: {
        type: Object,
        default: {lastMonth: true, last3Month: true, last6Month: true, lastYear: true, custom: true},
        required: false
    },
    customInvestBarChart: {
        type: Object,
        default: {daily: true, lastMonth: true, last3Month: true, last6Month: true, lastYear: true, custom: true},
        required: false
    },
    customInvestPieChart: {
        type: Object,
        default: {daily: true, lastMonth: true, last3Month: true, last6Month: true, lastYear: true, custom: true},
        required: false
    },
    customInvestLineChart: {
        type: Object,
        default: {lastMonth: true, last3Month: true, last6Month: true, lastYear: true, custom: true},
        required: false
    },
    customIncomeBarChart: {
        type: Object,
        default: {daily: true, lastMonth: true, last3Month: true, last6Month: true, lastYear: true, custom: true},
        required: false
    },
    customIncomePieChart: {
        type: Object,
        default: {daily: true, lastMonth: true, last3Month: true, last6Month: true, lastYear: true, custom: true},
        required: false
    },
    customIncomeLineChart: {
        type: Object,
        default: {lastMonth: true, last3Month: true, last6Month: true, lastYear: true, custom: true},
        required: false
    },
    customCreditBarChart: {
        type: Object,
        default: {daily: true, lastMonth: true, last3Month: true, last6Month: true, lastYear: true, custom: true},
        required: false
    },
    customCreditPieChart: {
        type: Object,
        default: {daily: true, lastMonth: true, last3Month: true, last6Month: true, lastYear: true, custom: true},
        required: false
    },
    customCreditLineChart: {
        type: Object,
        default: {lastMonth: true, last3Month: true, last6Month: true, lastYear: true, custom: true},
        required: false
    },
    spendingsReport: {
        type: Object,
        default: {daily: true, lastMonth: true, last3Month: true, last6Month: true, lastYear: true, custom: true},
        required: false
    },
    incomeReport: {
        type: Object,
        default: {daily: true, lastMonth: true, last3Month: true, last6Month: true, lastYear: true, custom: true},
        required: false
    },
    investmentReport: {
        type: Object,
        default: {daily: true, lastMonth: true, last3Month: true, last6Month: true, lastYear: true, custom: true},
        required: false
    },
    creditCardReport: {
        type: Object,
        default: {daily: true, lastMonth: true, last3Month: true, last6Month: true, lastYear: true, custom: true},
        required: false
    },
    generalReport: {
        type: Object,
        default: {daily: true, lastMonth: true, last3Month: true, last6Month: true, lastYear: true, custom: true},
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

// User Dashboard model
const userDashboardSettings = new mongoose.model('userDashboardSettings', userDashboardSettingsSchema);

module.exports = userDashboardSettings;

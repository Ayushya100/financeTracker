const mongoose = require('mongoose');

// User Logs Schema
const userLogSchema = new mongoose.Schema({
    logType: {
        type: String,
        required: true
    },
    logDetails: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    logDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    apiDetail: {
        type: String,
        required: false
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now()
    },
    createdBy: {
        type: String,
        required: true
    }
});

// Create UserLogs
const userLog = new mongoose.model('UserLogs', userLogSchema);

module.exports = userLog;

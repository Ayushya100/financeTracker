// Add User Logs Model
const userLogs = require('../models/userLogs');

// API Details
const apiDetail = require('../apiDetails.json');

const errorLog = async(payloadValidationResult) => {
    let logPayload = {
        logType: payloadValidationResult.logType,
        logDetails: {
            APIStatus: payloadValidationResult.code,
            errorMessage: payloadValidationResult.logDetails,
            requestBody: payloadValidationResult.requestBody,
            step: 'INTERMEDIATE VALIDATION FAILED'
        },
        message: payloadValidationResult.message,
        apiDetail: apiDetail.apiDetails[payloadValidationResult.logType]
    };

    const logs = new userLogs(logPayload);
    await logs.save();
};

module.exports = errorLog;

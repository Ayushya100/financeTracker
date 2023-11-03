// Add User Logs Model
const userLogs = require('../models/userLogs');

// API Details
const apiDetail = require('../apiDetails.json');

const unknownError = async(payloadValidationResult) => {
    let logPayload = {
        logType: payloadValidationResult.logType,
        logDetails: {
            APIStatus: payloadValidationResult.code,
            errorMessage: "An unexpected error occurred.",
            error: JSON.stringify(payloadValidationResult.logDetails),
            requestBody: payloadValidationResult.requestBody,
            step: 'UNKNOWN ERROR'
        },
        message: payloadValidationResult.message,
        apiDetail: apiDetail.apiDetails[payloadValidationResult.logType]
    };

    const logs = new userLogs(logPayload);
    await logs.save();
};

module.exports = unknownError;

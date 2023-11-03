// Add User Logs Model
const userLogs = require('../models/userLogs');

// API Details
const apiDetail = require('../apiDetails.json');

const userExistLog = async(payload, payloadValidationResult) => {
    let logPayload = {
        logType: payloadValidationResult.logType,
        logDetails: {
            APIStatus: payloadValidationResult.code,
            errorMessage: payloadValidationResult.message,
            requestBody: payload,
            step: 'CHECK USER EXIST'
        },
        message: payloadValidationResult.type,
        apiDetail: apiDetail.apiDetails[payloadValidationResult.logType]
    };

    const logs = new userLogs(logPayload);
    await logs.save();
}

module.exports = userExistLog;

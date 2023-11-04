const validatePayload = (payload, type) => {
    let requestType = type;

    if (requestType === 'update-profile-image') {
        return updateImageValidation(payload);
    }
}

// Update Profile Image Request
const updateImageValidation = (payload) => {
    const missingMsg = 'Required parameters are missing:';
    let payloadResult = {
        code: 200,
        message: 'Payload verified',
        type: 'SUCCESS',
        logType: 'update-profile-image-request'
    };

    if (!payload.id || !payload.profileImageFile) {
        payloadResult.code = 400;
        payloadResult.type = 'FAILED';

        for (const param in payload) {
            if (!payload[param]) {
                payloadResult.message = `${missingMsg} ${param}`;
                break;
            }
        }
    }
    return payloadResult;
}

module.exports = validatePayload;

const express = require('express');
const router = express.Router();

const services = require('../../services/user-info-services');

// Add User Logs Services
const userLogServices = require('../../logServices');

// API
router.post('/', async(req, res) => {
    try {
        const payload = req.body;
        const validatePayloadResult = await services.validatePayload(payload, 'request-password-reset');
        userLogServices.payloadValidationLog(payload, validatePayloadResult);

        if (validatePayloadResult.code === 200) {
            const passwordResetResult = await services.requestPasswordReset(payload);

            res.status(passwordResetResult.code).send(passwordResetResult.message);
        } else {
            res.status(validatePayloadResult.code).send(validatePayloadResult.message);
        }
    } catch(err) {
        userLogServices.unknownError({
            logType: 'password-reset-request',
            code: 500,
            logDetails: err,
            requestBody: req.body,
            message: 'FAILED'
        });
        res.status(500).send(err);
    }
});

module.exports = router;

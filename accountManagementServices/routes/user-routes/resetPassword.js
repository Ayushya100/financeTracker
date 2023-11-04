const express = require('express');
const router = express.Router();

// Services
const services = require('../../services/user-info-services');

// Add User Logs Services
const userLogServices = require('../../logServices');

router.post('/:code', async(req, res) => {
    try {
        const payload = req.body;
        const verificationCode = req.params.code;
        const validatePayloadResult = await services.validatePayload(payload, 'reset-password');

        userLogServices.payloadValidationLog({
            verificationCode: verificationCode,
            payload: payload
        }, validatePayloadResult);

        if (validatePayloadResult.code === 200) {
            const passwordResetResult = await services.resetPassword(payload, verificationCode);

            res.status(passwordResetResult.code).send(passwordResetResult.message);
        } else {
            res.status(validatePayloadResult.code).send(validatePayloadResult.message);
        }
    } catch(err) {
        userLogServices.unknownError({
            logType: 'reset-password-request',
            code: 500,
            logDetails: err,
            requestBody: req.body,
            message: 'FAILED'
        });
        res.status(500).send(err);
    }
});

module.exports = router;

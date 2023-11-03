const express = require('express');
const router = express.Router();

const services = require('../services');

// Add User Logs Services
const userLogServices = require('../logServices');

// API
router.post('/', async(req, res) => {
    try {
        let payload = req.body;
        let payloadValidationResult = await services.validatePayload(payload, 'login-user');
        userLogServices.payloadValidationLog({
            userName: payload.userName
        }, payloadValidationResult);

        if (payloadValidationResult.code === 200) {
            const loginRes = await services.userLogin(payload);
            res.status(loginRes.code).send(loginRes.message);
        } else {
            res.status(payloadValidationResult.code).send(payloadValidationResult.message);
        }
    } catch(err) {
        userLogServices.unknownError({
            logType: 'user-login-request',
            code: 500,
            logDetails: err,
            requestBody: { userName: req.body.userName },
            message: 'FAILED'
        });
        res.status(500).send(err);
    }
});

module.exports = router;

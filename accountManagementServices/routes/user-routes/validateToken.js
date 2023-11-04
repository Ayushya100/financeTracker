const express = require('express');
const router = express.Router();

const services = require('../../services/user-info-services');

// Add User Logs Services
const userLogServices = require('../../logServices');

// API
router.post('/', async(req, res) => {
    try {
        let payload = req.body;
        const payloadValidationResult = await services.validatePayload(payload, 'validate-token');
        userLogServices.payloadValidationLog(payload, payloadValidationResult);

        if (payloadValidationResult.code === 200) {
            const tokenValidationResult = await services.validateToken(payload);
            
            if ((tokenValidationResult.message === 'valid') && (payload.id === tokenValidationResult.result.id)) {
                const result = await services.verifyUserById(payload.id);
                if (result === true) {
                    res.status(200).send(tokenValidationResult);
                } else {
                    res.status(401).send('Unauthorized user');
                }
            } else {
                res.status(401).send(tokenValidationResult);
            }
        } else {
            res.status(payloadValidationResult.code).send(payloadValidationResult.message);
        }
    } catch(err) {
        userLogServices.unknownError({
            logType: 'token-verify-request',
            code: 500,
            logDetails: err,
            requestBody: req.body,
            message: 'FAILED'
        });
        res.status(500).send(err);
    }
});

module.exports = router;

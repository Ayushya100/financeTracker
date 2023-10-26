const express = require('express');
const router = express.Router();

const services = require('../services');

// API
router.post('/', async(req, res) => {
    try {
        const payload = req.body;
        const validatePayloadResult = await services.validatePayload(payload, 'request-password-reset');

        if (validatePayloadResult.code === 200) {
            const passwordResetResult = await services.requestPasswordReset(payload);

            res.status(passwordResetResult.code).send(passwordResetResult.message);
        } else {
            res.status(validatePayloadResult.code).send(validatePayloadResult.message);
        }
    } catch(err) {
        res.status(500).send(err);
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();

// Services
const services = require('../services');

router.post('/:code', async(req, res) => {
    try {
        const payload = req.body;
        const verificationCode = req.params.code;
        const validatePayloadResult = await services.validatePayload(payload, 'reset-password');

        if (validatePayloadResult.code === 200) {
            const passwordResetResult = await services.resetPassword(payload, verificationCode);

            res.status(passwordResetResult.code).send(passwordResetResult.message);
        } else {
            res.status(validatePayloadResult.code).send(validatePayloadResult.message);
        }
    } catch(err) {
        res.status(500).send(err);
    }
});

module.exports = router;

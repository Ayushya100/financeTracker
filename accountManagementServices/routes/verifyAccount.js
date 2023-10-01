const express = require('express');
const path = require('path');
const router = express.Router();

const services = require('../services');

// API
router.get('/:id/:date/:code', async(req, res) => {
    try {
        const id = req.params.id;
        const createdDate = req.params.date;
        const verificationCode = req.params.code;

        const payloadValidationResult = await services.validatePayload(id, 'new-user-verification');
        if (payloadValidationResult === true) {
            const userVerificationResult = await services.verifyNewUser(id, createdDate, verificationCode);
            res.status(userVerificationResult.code).sendFile(path.join(__dirname, `../templates/${userVerificationResult.fileToDisplay}.html`));
        } else {
            res.status(payloadValidationResult.code).send(payloadValidationResult.message);
        }
    } catch(err) {
        res.status(500).send(err);
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();

const services = require('../services');

// API
router.get('/', async(req, res) => {
    try {
        let payload = req.body;
        let payloadValidationResult = await services.validatePayload(payload, 'login-user');
        
        if (payloadValidationResult === true) {
            const loginRes = await services.userLogin(payload);
            res.status(loginRes.code).send(loginRes.message);
        } else {
            res.status(payloadValidationResult.code).send(payloadValidationResult.message);
        }
    } catch(err) {
        res.status(500).send(err);
    }
});

module.exports = router;

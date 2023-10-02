const express = require('express');
const router = express.Router();

const services = require('../services');

// API
router.post('/', async(req, res) => {
    try {
        let payload = req.body;
        const payloadValidationResult = await services.validatePayload(payload, 'validate-token');
        
        if (payloadValidationResult === true) {
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
        res.status(500).send(err);
    }
});

module.exports = router;

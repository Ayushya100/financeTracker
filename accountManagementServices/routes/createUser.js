const express = require('express');
const router = express.Router();

const services = require('../services/index');

// API
router.post('/', async(req, res) => {
    try {
        let payload = req.body;
        let payloadValidationResult = await services.validatePayload(payload, 'new-user');

        if (payloadValidationResult === true) {
            const newUser = await services.createUser(payload);  
            res.status(newUser.code).send(newUser.message);
        } else {
            res.status(payloadValidationResult.code).send('Bad Request - ' + payloadValidationResult.message);
        }
    } catch(err) {
        res.status(500).send(err);
    }
});

module.exports = router;

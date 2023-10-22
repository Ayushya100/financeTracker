const express = require('express');
const router = express.Router();

const services = require('../services/index');

// API
router.post('/', async(req, res) => {
    try {
        const payload = req.body;
        const payloadValidationResult = await services.validatePayload(payload, 'new-user');

        if (payloadValidationResult.code === 200) {
            const checkUserExist = await services.checkUserExist(payload, 'new-user');

            if (checkUserExist.code === 200) {
                const newUser = await services.createUser(payload);  
                res.status(newUser.code).send(newUser.message);
            } else {
                res.status(checkUserExist.code).send(checkUserExist.message);
            }
        } else {
            res.status(payloadValidationResult.code).send('Bad Request - ' + payloadValidationResult.message);
        }
    } catch(err) {
        res.status(500).send(err);
    }
});

module.exports = router;

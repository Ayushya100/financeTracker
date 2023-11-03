const express = require('express');
const router = express.Router();

const services = require('../services/index');

// Add User Logs Services
const userLogServices = require('../logServices');

// API
router.post('/', async(req, res) => {
    try {
        const payload = req.body;
        let payloadLog = { ...payload };
        delete payloadLog.password;

        const payloadValidationResult = await services.validatePayload(payload, 'new-user');
        userLogServices.payloadValidationLog(payloadLog, payloadValidationResult);

        if (payloadValidationResult.code === 200) {
            const checkUserExist = await services.checkUserExist(payload, 'new-user');
            userLogServices.userExistLog(payloadLog, checkUserExist);

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
        userLogServices.unknownError({
            logType: 'create-user-request',
            code: 500,
            logDetails: err,
            requestBody: delete req.body.password,
            message: 'FAILED'
        });
        res.status(500).send(err);
    }
});

module.exports = router;

const express = require('express');
const path = require('path');
const router = express.Router();

const services = require('../services');

// Add User Logs Services
const userLogServices = require('../logServices');

// API
router.get('/:id/:date/:code', async(req, res) => {
    try {
        const id = req.params.id;
        const createdDate = req.params.date;
        const verificationCode = req.params.code;

        const payloadValidationResult = await services.validatePayload(id, 'new-user-verification');
        userLogServices.payloadValidationLog({
            userId: id,
            timeOfCodeCreation: createdDate
        }, payloadValidationResult);

        if (payloadValidationResult.code === 200) {
            const checkUserExist = await services.checkUserExist(id, 'new-user-verification');
            userLogServices.userExistLog({
                userId: id,
                timeOfCodeCreation: createdDate
            }, checkUserExist);

            if (checkUserExist.code === 200) {
                const userVerificationResult = await services.verifyNewUser(id, createdDate, verificationCode);
                res.status(userVerificationResult.code).sendFile(path.join(__dirname, `../templates/${userVerificationResult.fileToDisplay}.html`));
            } else {
                res.status(checkUserExist.code).send(checkUserExist.message);
            }
        } else {
            res.status(payloadValidationResult.code).send(payloadValidationResult.message);
        }
    } catch(err) {
        userLogServices.unknownError({
            logType: 'user-verify-request',
            code: 500,
            logDetails: err,
            requestBody: {
                userId: req.params.id,
                timeOfCodeCreation: req.params.date
            },
            message: 'FAILED'
        });
        res.status(500).send(err);
    }
});

module.exports = router;

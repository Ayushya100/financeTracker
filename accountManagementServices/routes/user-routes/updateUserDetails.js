const express = require('express');
const router = express.Router();
const axios = require('axios');

const services = require('../../services/user-info-services');
const emailServices = require('../../emailServices');

// Add User Logs Services
const userLogServices = require('../../logServices');

// API
router.put('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        let token = req.headers['authorization'].split(' ');
        token = token[1];
        const payload = req.body;

        const validateTokenResult = await axios.post('http://localhost:3200/api/users/validateToken', {id, token}).then(res => {
            return {code: res.status, message: res.statusText};
        }).catch(err => {
            return {code: err.response.status, message: err.response.statusText};
        });

        if (validateTokenResult.code === 200) {
            payload.id = id;
            const payloadValidationResult = await services.validatePayload(payload, 'update-user');
            userLogServices.payloadValidationLog({
                userId: id,
                token: token,
                payload: payload
            }, payloadValidationResult);

            if (payloadValidationResult.code === 200) {
                const userUpdateResult = await services.updateUserDetails(payload);

                if (userUpdateResult.code === 201) {
                    const updatedUser = await services.getUserInfo(id);
                    emailServices.userUpdatedMail(updatedUser.message);
                    
                    res.status(updatedUser.code).send(updatedUser.message);
                } else {
                    res.status(userUpdateResult.code).send(userUpdateResult.message);
                }
            } else {
                res.status(payloadValidationResult.code).send(payloadValidationResult.message);
            }
        } else {
            res.status(validateTokenResult.code).send(validateTokenResult.message);
        }
    } catch(err) {
        userLogServices.unknownError({
            logType: 'update-user-request',
            code: 500,
            logDetails: err,
            requestBody: req.body,
            message: 'FAILED'
        });
        res.status(500).send(err);
    }
});

module.exports = router;

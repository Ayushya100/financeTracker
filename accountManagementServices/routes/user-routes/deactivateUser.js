const express = require('express');
const router = express.Router();
const axios = require('axios');

const services = require('../../services/user-info-services');

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
            const validatePayloadResult = await services.validatePayload(payload, 'deactivate-user');
            userLogServices.payloadValidationLog({
                userId: id,
                token: token,
                payload: payload
            }, validatePayloadResult);

            if (validatePayloadResult.code === 200) {
                const deactivateUserResult = await services.deactivateUser(id, payload);
                res.status(deactivateUserResult.code).send(deactivateUserResult.message);
            } else {
                res.status(validatePayloadResult.code).send(validatePayloadResult.message);
            }
        } else {
            res.status(validateTokenResult.code).send(validateTokenResult.message);
        }
    } catch(err) {
        userLogServices.unknownError({
            logType: 'deactivate-user-request',
            code: 500,
            logDetails: err,
            requestBody: req.body,
            message: 'FAILED'
        });
        res.status(500).send(err);
    }
});

module.exports = router;

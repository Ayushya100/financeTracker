const express = require('express');
const router = express.Router();
const axios = require('axios');

const services = require('../../services/user-image-services');

// Add User Logs Services
const userLogServices = require('../../logServices');

// API
router.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        let token = req.headers['authorization'].split(' ');
        token = token[1];

        const validateTokenResult = await axios.post('http://localhost:3200/api/users/validateToken', { id, token }).then(res => {
            return {code: res.status, message: res.statusText};
        }).catch(err => {
            return {code: err.response.status, message: err.response.statusText};
        });

        if (validateTokenResult.code === 200) {
            const payloadValidationResult = await services.validatePayload({userId: id}, 'delete-profile-image');
            userLogServices.userExistLog({userId: id}, payloadValidationResult);

            if (payloadValidationResult.code === 200) {
                const userProfileImageResult = await services.deleteProfileImage(id);
                res.status(userProfileImageResult.code).send(userProfileImageResult.message);
            } else {
                res.status(payloadValidationResult.code).send(payloadValidationResult.message);
            }
        } else {
            res.status(validateTokenResult.code).send(validateTokenResult.message);
        }
    } catch(err) {
        userLogServices.unknownError({
            logType: 'delete-profile-image-request',
            code: 500,
            logDetails: err,
            requestBody: { userId: req.params.id },
            message: 'FAILED'
        });
        res.status(500).send(err);
    }
});

module.exports = router;

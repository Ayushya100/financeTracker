const express = require('express');
const router = express.Router();
const axios = require('axios');

const services = require('../services');

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
            const validatePayloadResult = await services.validatePayload(payload, 'update-password');

            if (validatePayloadResult === true) {
                const userUpdateResult = await services.updateUserPassword(id, payload);

                if(userUpdateResult.code === 200) {
                    const updatedUser = await services.getUserInfo(id);
                    res.status(updatedUser.code).send(updatedUser.message);
                } else {
                    res.status(userUpdateResult.code).send(userUpdateResult.message);
                }
            } else {
                res.status(validatePayloadResult.code).send(validatePayloadResult.message);
            }
        } else {
            res.status(validateTokenResult.code).send(validateTokenResult.message);
        }
    } catch(err) {
        res.status(500).send(err);
    }
});

module.exports = router;

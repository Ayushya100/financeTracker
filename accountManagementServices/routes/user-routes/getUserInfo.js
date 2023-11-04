const express = require('express');
const router = express.Router();
const axios = require('axios');

const services = require('../../services/user-info-services');

// Add User Logs Services
const userLogServices = require('../../logServices');

// API
router.get('/:id', async(req, res) => {
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
            const userDetails = await services.getUserInfo(id);
            res.status(userDetails.code).send(userDetails.message);
        } else {
            res.status(validateTokenResult.code).send(validateTokenResult.message);
        }
    } catch(err) {
        userLogServices.unknownError({
            logType: 'get-user-info-request',
            code: 500,
            logDetails: err,
            requestBody: req.body,
            message: 'FAILED'
        });
        res.status(500).send(err);
    }
});

module.exports = router;

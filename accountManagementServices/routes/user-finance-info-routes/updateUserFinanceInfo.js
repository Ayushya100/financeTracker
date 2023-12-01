const express = require('express');
const router = express.Router();
const axios = require('axios');

const services = require('../../services/user-finance-info-services');

// Add user Logs Services
const userLogServices = require('../../logServices');

// API
router.put('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        let token = req.headers['authorization'].split(' ');
        token = token[1];
        let dataToUpdate = req.body;

        const validateTokenResult = await axios.post('http://localhost:3200/api/users/validateToken', { id, token }).then(res => {
            return {code: res.status, message: res.statusText};
        }).catch(err => {
            return {code: err.response.status, message: err.response.statusText};
        });

        if (validateTokenResult.code === 200) {
            dataToUpdate.userId = id;
            const userFinanceUpdateResult = await services.updateUserFinanceInfo(dataToUpdate);

            if (userFinanceUpdateResult.code === 201) {
                const updatedUser = await services.getUserFinanceInfo(id);
                res.status(updatedUser.code).send(updatedUser.message);
            } else {
                res.status(userFinanceUpdateResult.code).send(userFinanceUpdateResult.message);
            }
        } else {
            res.status(validateTokenResult.code).send(validateTokenResult.message);
        }
    } catch(err) {
        userLogServices.unknownError({
            logType: 'update-user-finance-request',
            code: 500,
            logDetails: err,
            requestBody: {userId: req.params.id},
            message: 'FAILED'
        });
        res.status(500).send(err);
    }
});

module.exports = router;

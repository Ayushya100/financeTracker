const express = require('express');
const router = express.Router();
const axios = require('axios');
const multer = require('multer');

const services = require('../../services/user-image-services');

// Add User Logs Services
const userLogServices = require('../../logServices');

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

// API
router.put('/:id', upload.single('profileImage'), async(req, res) => {
    try {
        const id = req.params.id;
        let token = req.headers['authorization'].split(' ');
        token = token[1];
        const profileImageFile = req.file;

        const validateTokenResult = await axios.post('http://localhost:3200/api/users/validateToken', { id, token }).then(res => {
            return {code: res.status, message: res.statusText};
        }).catch(err => {
            return {code: err.response.status, message: err.response.statusText};
        });

        if (validateTokenResult.code === 200) {
            const payloadValidationResult = await services.validatePayload({id, profileImageFile}, 'update-profile-image');
            userLogServices.userExistLog({id, profileImageFile}, payloadValidationResult);

            if (payloadValidationResult.code === 200) {
                const updateImageResult = await services.updateProfileImage(id, profileImageFile);
                res.status(updateImageResult.code).send(updateImageResult.message);
            } else {
                res.status(payloadValidationResult.code).send(payloadValidationResult.message)
            }
        } else {
            res.status(validateTokenResult.code).send(validateTokenResult.message);
        }
    } catch(err) {
        userLogServices.unknownError({
            logType: 'update-profile-image-request',
            code: 500,
            logDetails: err,
            requestBody: { userId: req.params.id },
            message: 'FAILED'
        });
        res.status(500).send(err);
    }
});

module.exports = router;

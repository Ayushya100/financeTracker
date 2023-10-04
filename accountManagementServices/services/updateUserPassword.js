const bcrypt = require('bcrypt');

// Add Models
const Users = require('../models/userInfoModels');

const updateUserPassword = async(id, payload) => {
    const user = await Users.findById(id);

    if (user != null) {
        const validPassword = await bcrypt.compare(payload.oldPassword, user.password);
        if (validPassword) {
            const newPassword = payload.newPassword;
            const saltRounds = 10;

            const encryptedPassword = await bcrypt.hash(newPassword, saltRounds);
            await Users.findByIdAndUpdate(id, {password: encryptedPassword});
            return {code: 200, message: 'User updated'};
        } else {
            return {code: 403, message: 'Unauthorized user'};
        }
    } else {
        return {code: 404, message: 'User does not exist'};
    }
}

module.exports = updateUserPassword;

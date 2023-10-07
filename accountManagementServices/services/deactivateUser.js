const bcrypt = require('bcrypt');

// Models
const Users = require('../models/userInfoModels');

const deactivateUser = async(id, payload) => {
    const userName = payload.userName;
    const password = payload.password;

    const requiredUser = await Users.findById(id);

    if (requiredUser) {
        const isAuthenticated = await bcrypt.compare(password, requiredUser.password);

        if (isAuthenticated && (userName === requiredUser.userName)) {
            await Users.findByIdAndUpdate(id, {
                lastLogin: Date.now(),
                isDeleted: true
            });

            const infoToDisplay = '_id firstName lastName userName emailId createdOn lastLogin isDeleted';
            const updatedUser = await Users.findById(id, infoToDisplay);
            return {code: 200, message: updatedUser};
        } else {
            return {code: 401, message: 'Unauthorized User'};
        }
    } else {
        return {code: 404, message: 'User does not exist'};
    }
}

module.exports = deactivateUser;

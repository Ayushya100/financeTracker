// Add Models
const User = require('../models/userInfoModels');

const getUserInfo = async(id) => {
    const infoToDisplay = '_id firstName lastName userName bio gender dob occupation emailId contactNumber createdOn lastLogin loginCount';
    try {
        const userDetails = await User.findById(id, infoToDisplay);
        return {code: 200, message: userDetails};
    } catch(err) {
        return {code: 500, message: err};
    }
}

module.exports = getUserInfo;

// Adding Models
const User = require('../models/userInfoModels');

const verifyUserById = async(id) => {
    const userInfo = await User.findById(id);
    if(!userInfo) {
        return false;
    }
    return true;
}

module.exports = verifyUserById;

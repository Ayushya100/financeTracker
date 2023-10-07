module.exports = {
    validatePayload: require('./validatePayload'),
    createUser: require('./createUser'),
    verifyNewUser: require('./verifyUserAccount'),
    userLogin: require('./userLogin'),
    validateToken: require('./validateToken'),
    verifyUserById: require('./verifyUserById'),
    getUserInfo: require('./getUserInfo'),
    updateUserDetails: require('./updateUserDetails'),
    updateUserPassword: require('./updateUserPassword'),
    deactivateUser: require('./deactivateUser')
};
module.exports = {
    createUser: require('./createUser'),
    verifyUser: require('./verifyAccount'),
    userLogin: require('./userLogin'),
    validateToken: require('./validateToken'),
    getUserInfo: require('./getUserInfo'),
    updateUserDetails: require('./updateUserDetails'),
    updateUserPassword: require('./updateUserPassword'),
    deactivateUser: require('./deactivateUser'),
    requestPasswordReset: require('./requestPasswordReset')
};
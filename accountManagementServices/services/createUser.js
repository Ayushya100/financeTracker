const bcrypt = require('bcrypt');

const emailServices = require('../emailServices/index');

// Adding Models
const User = require('../models/userInfoModels');
const UserImg = require('../models/userImageModels');
const UserFinance = require('../models/userBasicFinanceModels');
const UserDashboard = require('../models/userDashboardSettingsModels');

// Service Functionality
const createUser = async(payload) => {
    let password = payload.password;
    let saltRounds = 10;

    // Hash the password before creating the user
    payload.password = await bcrypt.hash(password, saltRounds);

    // Create new User
    const user = new User(payload);
    const createdUser = await user.save().then(async(res) => {
        const newUser = res;

        // Create user records for image, finance, & dashboard
        const userImage = new UserImg({userId: newUser._id, userName: newUser.userName});
        const userFinance = new UserFinance({userId: newUser._id, userName: newUser.userName});
        const userDashboard = new UserDashboard({userId: newUser._id, userName: newUser.userName});
        await userImage.save();
        await userFinance.save();
        await userDashboard.save();

        // Create verification code & update
        payload.verificationCode = emailServices.sendVerificationMail(newUser._id, newUser.emailId);
        await User.findByIdAndUpdate(newUser._id, payload);

        const infoToDisplay = '_id firstName lastName userName emailId createdOn isVerified verificationCode';
        const updatedUser = await User.findById(newUser._id, infoToDisplay);
        return {code: 201, message: updatedUser};
    }).catch(err => {
        return {code: 400, message: err};
    });

    return createdUser;
}

module.exports = createUser;

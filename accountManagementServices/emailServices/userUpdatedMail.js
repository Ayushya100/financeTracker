const transporter = require('../connections/emailConnection');

const userUpdatedSuccessfullyMail = (userInfo) => {
    const mailOptions = {
        from: 'dailyFinance',
        to: userInfo.emailId,
        subject: 'Account Details Successfully Updated',
        template: 'userUpdatedMail',
        context: {
            fullName: userInfo.firstName + " " + userInfo.lastName,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            userName: userInfo.userName,
            emailId: userInfo.emailId,
            contactNumber: userInfo.contactNumber,
            dob: userInfo.dob.toDateString(),
            bio: userInfo.bio,
            occupation: userInfo.occupation,
            createdOn: userInfo.createdOn.toDateString(),
            lastLogin: userInfo.lastLogin.toDateString(),
            custContactEmailId: process.env.CUST_CONTACT_EMAIL_ID
        }
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Email has been sent to: ${userInfo.emailId}`);
        }
    });
};

module.exports = userUpdatedSuccessfullyMail;

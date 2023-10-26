const transporter = require('../connections/emailConnection');

const accountVerifiedSuccessfullyMail = (userInfo) => {
    const mailOptions = {
        from: 'dailyFinance',
        to: userInfo.emailId,
        subject: 'Account Verified - Welcome to dailyFinance',
        template: 'verificationSuccessfulMail',
        context: {
            fullName: userInfo.firstName + " " + userInfo.lastName,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            userName: userInfo.userName,
            contactNumber: userInfo.contactNumber,
            emailId: userInfo.emailId,
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

module.exports = accountVerifiedSuccessfullyMail;

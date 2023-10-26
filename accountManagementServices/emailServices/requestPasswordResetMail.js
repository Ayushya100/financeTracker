const transporter = require('../connections/emailConnection');

const requestPasswordResetMail = (userInfo) => {
    const mailOptions = {
        from: 'dailyFinance',
        to: userInfo.emailId,
        subject: 'Password Reset Request',
        template: 'requestPasswordResetMail',
        context: {
            fullName: userInfo.fullName,
            verificationLink: process.env.FRONTEND_URL + "/reset-password/" +  userInfo.verificationLink,
            custContactEmailId: process.env.CUST_CONTACT_EMAIL_ID
        }
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Email has been sent to ${userInfo.emailId}`);
        }
    });
};

module.exports = requestPasswordResetMail;

const transporter = require('../connections/emailConnection');

const requestPasswordResetMail = (userInfo) => {
    const mailOptions = {
        from: 'shadow.works',
        to: userInfo.emailId,
        subject: 'Password Reset Request',
        template: 'requestPasswordResetMail',
        context: {
            fullName: userInfo.fullName,
            verificationLink: userInfo.verificationLink
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

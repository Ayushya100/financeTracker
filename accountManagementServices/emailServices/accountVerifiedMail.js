const transporter = require('../connections/emailConnection');

const accountVerifiedSuccessfullyMail = (userInfo) => {
    const mailOptions = {
        from: 'shadow.works',
        to: userInfo.emailId,
        subject: 'Ready to Roll: Your Account Is Verified.',
        template: 'verificationSuccessfulMail',
        context: {
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            userName: userInfo.userName,
            phoneNo: userInfo.contactNumber,
            emailId: userInfo.emailId
        }
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Email has been sent to: ${emailId}`);
        }
    });
};

module.exports = accountVerifiedSuccessfullyMail;

const {v4: uuidv4} = require('uuid');

const transporter = require('../connections/emailConnection');

// Verification Mail Service
const sendVerificationMail = (custId, emailId) => {
    const url = 'http://localhost:3200/api/users/verify/';
    const uniqueString = uuidv4() + custId;

    const mailOptions = {
        from: 'shadow.works',
        to: emailId,
        subject: 'Verify your email to activate your account with FinanceTracker',
        template: 'verificationMail',
        context: {
            verificationCode: url + custId + '/' + Date.now() + '/' + uniqueString
        }
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Email has been sent to: ${emailId}`);
        }
    });

    return uniqueString;
};

module.exports = sendVerificationMail;

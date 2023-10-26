const {v4: uuidv4} = require('uuid');

const transporter = require('../connections/emailConnection');

// Verification Mail Service
const sendVerificationMail = (custId, emailId, name) => {
    const uniqueString = uuidv4() + custId;

    const mailOptions = {
        from: 'dailyFinance',
        to: emailId,
        subject: 'Welcome to dailyFinance - Verify Your Email and Activate Your Account',
        template: 'verificationMail',
        context: {
            fullName: name,
            verificationCode: process.env.FRONTEND_URL + "/verify/" + custId + '/' + Date.now() + '/' + uniqueString,
            custContactEmailId: process.env.CUST_CONTACT_EMAIL_ID
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

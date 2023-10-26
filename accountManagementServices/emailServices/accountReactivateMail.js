const transporter = require('../connections/emailConnection');

const accountReactivatedMail = (emailId, fullName) => {
    const mailOptions = {
        from: 'dailyFinance',
        to: emailId,
        subject: 'Welcome Back! Your Account is Reactivated.',
        template: 'accountReactivateMail',
        context: {
            fullName: fullName,
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
};

module.exports = accountReactivatedMail;
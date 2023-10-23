const transporter = require('../connections/emailConnection');

const accountReactivatedMail = (emailId, fullName) => {
    const mailOptions = {
        from: 'shadow.works',
        to: emailId,
        subject: 'Welcome Back! Your Account is Reactivated.',
        template: 'accountReactivateMail',
        context: {
            fullName: fullName
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
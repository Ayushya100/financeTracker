const transporter = require('../connections/emailConnection');

const accountDeactivatedMail = (payload) => {
    const mailOptions = {
        from: 'dailyFinance',
        to: payload.emailId,
        subject: 'Account Deactivation Confirmation',
        template: 'accountDeactivatedMail',
        context: {
            fullName: payload.fullName,
            dateOfDeactivation: payload.dateOfDeactivation,
            reactivationTimeline: payload.reactivationTimeline,
            custContactEmailId: process.env.CUST_CONTACT_EMAIL_ID
        }
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Email has been sent to: ${payload.emailId}`);
        }
    });
};

module.exports = accountDeactivatedMail;

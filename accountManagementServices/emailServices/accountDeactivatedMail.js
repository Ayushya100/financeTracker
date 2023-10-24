const transporter = require('../connections/emailConnection');

const accountDeactivatedMail = (payload) => {
    const mailOptions = {
        from: 'shadow.works',
        to: payload.emailId,
        subject: 'Account Deactivation Confirmation',
        template: 'accountDeactivatedMail',
        context: {
            fullName: payload.fullName,
            dateOfDeactivation: payload.dateOfDeactivation,
            reactivationTimeline: payload.reactivationTimeline
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

const cron = require('node-cron');

const Users = require('../models/userInfoModels');
const Logs = require('../models/userLogs');

// Job Scheduler
const userVerificationCheckJob = async() => {
    let thirtyDaysAgo = new Date();
    console.log(`User Verification Scheduler executed at ${thirtyDaysAgo}`);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    try {
        const queryParameters = {
            isVerified: false
        }
        const usersToBeVerified = await Users.find(queryParameters);

        const usersToBeChecked = [];
        usersToBeVerified.forEach(async(res) => {
            const accountCreationTime = res.lastLogin ? res.lastLogin : res.createdOn;
            if (accountCreationTime > thirtyDaysAgo) {
                usersToBeChecked.push(res);
                res.isDeleted = true;
                res.modifiedOn = Date.now();
                await Users.findByIdAndUpdate(res._id, res);
            }
        });

        if (usersToBeChecked.length > 0) {
            const payload = {
                "logType": "scheduled-user-verification-check",
                "logDetails": {
                    "updatedUsersCount": usersToBeChecked.length,
                    "isDeleteModifiedRecords": usersToBeChecked,
                    "thirtyDaysPrior": thirtyDaysAgo
                },
                "logDate": new Date(),
                "createdBy": "scheduler-service"
            };
            
            const log = new Logs(payload);
            await log.save();
        }
    } catch(err) {
        const payload = {
            "logType": "scheduled-user-verification-check",
            "logDetails": `Some error occurred: ${err}`,
            "logDate": new Date(),
            "createdBy": "scheduler-service"
        }

        const log = new Logs(payload);
        await log.save();
    }
};

cron.schedule('0 0 * * *', userVerificationCheckJob);

module.exports = { start: userVerificationCheckJob };

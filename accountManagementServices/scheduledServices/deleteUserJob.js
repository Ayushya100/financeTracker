const cron = require('node-cron');

const Users = require('../models/userInfoModels');
const Logs = require('../models/userLogs');

// Job
const deleteUserJob = async() => {
    let thirtyDaysAgo = new Date();
    console.log(`Delete User Scheduler executed at ${thirtyDaysAgo}`);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    try {
        const queryParameters = {
            isDeleted: true,
            lastLogin: {$lte: thirtyDaysAgo}
        };
        const usersToBeDeleted = await Users.find(queryParameters);
        const deletedUser = await Users.deleteMany(queryParameters);
    
        if (deletedUser.deletedCount > 0) {
            const payload = {
                "logType": "delete-scheduled-users",
                "logDetails": {
                    "acknowledged": deletedUser.acknowledged,
                    "deletedUsersCount": deletedUser.deletedCount,
                    "deletedRecords": usersToBeDeleted,
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
            "logType": "delete-scheduled-users",
            "logDetails": `Some error occurred: ${err}`,
            "logDate": new Date(),
            "createdBy": "scheduler-service"
        }

        const log = new Logs(payload);
        await log.save();
    }
}

cron.schedule('0 * * * *', deleteUserJob);

module.exports = { start: deleteUserJob };

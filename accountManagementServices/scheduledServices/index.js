const deleteUserJob = require('./deleteUserJob');
const userVerificationCheckJob = require('./userVerificationCheckJob');

deleteUserJob.start();
userVerificationCheckJob.start();
const mongoose = require('mongoose');

const dbURL = 'mongodb://localhost:27017';
const dbName = 'financeCollections';

mongoose.connect(`${dbURL}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Connection is established with DB: ${dbName}`);
}).catch(err => {
    console.error(`Failed to connect with DB due to ${err}`);
});

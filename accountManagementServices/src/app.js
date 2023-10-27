const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Adding Middlewares - Cors
app.use(cors());
app.use(bodyparser.json());

// Adding required connection
require('../connections/dbConnection');

// Port No and API
const port = process.env.PORT;
const userApi = '/api/users';

// Routes
const usersRoute = require('../routes');

app.use(`${userApi}/createUser`, usersRoute.createUser);
app.use(`${userApi}/verify`, usersRoute.verifyUser);
app.use(`${userApi}/userLogin`, usersRoute.userLogin);
app.use(`${userApi}/validateToken`, usersRoute.validateToken);
app.use(`${userApi}/getUserInfo`, usersRoute.getUserInfo);
app.use(`${userApi}/updateUserDetails`, usersRoute.updateUserDetails);
app.use(`${userApi}/updateUserPassword`, usersRoute.updateUserPassword);
app.use(`${userApi}/deactivateUser`, usersRoute.deactivateUser);
app.use(`${userApi}/requestPasswordReset`, usersRoute.requestPasswordReset);
app.use(`${userApi}/resetPassword`, usersRoute.resetPassword);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
    // require('../scheduledServices');
});

module.exports = app;

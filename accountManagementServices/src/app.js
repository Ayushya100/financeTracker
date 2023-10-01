const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();

// Adding Middlewares - Cors
app.use(cors());
app.use(bodyparser.json());

// Adding required connection
require('../connections/dbConnection');

// Port No and API
const port = process.env.port || 3200;
const userApi = '/api/users';

// Routes
const usersRoute = require('../routes');

app.use(`${userApi}/createUser`, usersRoute.createUser);
app.use(`${userApi}/verify`, usersRoute.verifyUser);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

module.exports = app;
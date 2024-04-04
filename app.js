require('dotenv').config();
const express = require('express'); //importing express server
const server = express();  //initialize server
server.use(express.json());
const userRoute = require('./routes/user');
const roleRoute = require('./routes/role');
const mongoose = require('mongoose');
server.use("/roles", roleRoute);
server.use("/users", userRoute);
server.use((err, req, res, next) => {
    err.status = err.status || 200;
    res.status(err.status). json({
        cons: false,
        msg: err.message
    })
})

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
server.listen(process.env.PORT, console.log("Hello"));

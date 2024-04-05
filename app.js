require('dotenv').config();
const express = require('express'); //importing express server
const server = express();  //initialize server
server.use(express.json());


const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')
server.use(fileUpload());
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

const logged = (req, res, next) => {
    if (1 + 1 == 2) {
        req.user = { isLoggedIn: true };
        next();
    } else {
        next(new Error("You're not logged in"));
    }
}

const authenticated = (req, res, next) => {
    if (req.user && req.user.isLoggedIn) {
        next();
    } else {
        next(new Error("You're not authenticated"));
    }
}

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        res.json({ msg: "You're admin" });
    } else {
        next(new Error("You're not admin"));
    }
}

server.get("/users", logged, authenticated, isAdmin);
server.use("/posts", postRoute);

const fileSave = async (req, res, next) => {
    let file = req.files.file;
    let fileName = new Date().valueOf() + "_" + file.name;
    file.mv(`./uploads/${fileName}`);
    req.imageName = fileName;
    next();
}

server.post('/gallery', fileSave, (req, res, next) => {
    res.status(200).json({ msg: "File Uploded", fileName: req.imageName});
})

server.use((err, req, res, next) => {
    if (err.status === undefined) {
        err.status = 500;
    }
    res.status(err.status).json({
        success: false,
        message: err.message
    });
});

server.listen(process.env.PORT, () => {
    console.log("Server started on port " + process.env.PORT);
});
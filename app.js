require('dotenv').config();
const express = require('express'); //importing express server
const server = express();  //initialize server
server.use(express.json());
const path = require('path');

const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const categoryRoute = require('./routes/category');

const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const {saveFile,saveFiles,deleteFile} = require ('./utils/gallery');
server.use(fileUpload());
server.use('/uploads',express.static(path.join(__dirname,'uploads')))
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

server.use("/users",userRoute);
server.use("/posts", postRoute);
server.use("/categories",categoryRoute);

server.post('/gallery',saveFiles, async (req, res, next) => {
    res.status(200).json({ msg: "Images are uploaded!!!!!!!!",images: req.body.saveFiles});
})

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
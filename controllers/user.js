const DB = require("../models/user");
const helper = require("../utils/helper");
const Helper = require("../utils/helper")

const getAll = async (req, res, next) => {
    let users = await DB.find();
    Helper.fMsg(res, "Get All user successfully!!", users);
}

const create = async (req, res, next) => {
    let result = await new DB(req.body).save();
    Helper.fMsg(res, "User Added Successfully", result)
}

const update = async (req, res, next) => {
    let user = await DB.findById(req.params.id);
    if (user) {
        let updateUser = await DB.findByIdAndUpdate(user._id, req.body);
        if (updateUser) {
            let retUser = await DB.findById(updateUser._id);
            Helper.fMsg(res, "User Successfully Updated", retUser);
        } else {
            res.json({ msg: "User not updated successfully" });
        }
    } else {
        next(new Error("Error,User not Found with this id"))
    }
}

const drop = async (req, res, next) => {
    await DB.findByIdAndDelete(req.params.id);
    Helper.fMsg(res, "Deleted successfully!");
}

const fetch = async (req, res, next) => {
    let user = await DB.findById(req.params.id);
    Helper.fMsg(res, "Specified User", user);
}

const login = async (req, res, next) => {
    let emailUser = await DB.findOne({ email: req.body.email }).select("-__v");
    if (emailUser) {
        if (Helper.comparePassword(req.body.password, emailUser.password)) {
            let user = emailUser.toObject();
            delete user.password;
            user.token = Helper.generateToken(user);
            Helper.fMsg(res, "Login successed",user);
        } else {
            next(new Error("Wrong Password"));
        }
    } else {
        next(new Error("Wrong Email!!"));
    }

}
const register = async (req, res, next) => {

    let nameUser = await DB.findOne({ name: req.body.name });
    if (nameUser) {
        next(new Error("There is already user with username :" + req.body.name));
        return;
    }
    let emailUser = await DB.findOne({ email: req.body.email });
    if (emailUser) {
        next(new Error("There is already user with email : " + req.body.email));
        return;
    }
    let phoneUser = await DB.findOne({ phone: req.body.phone });
    if (phoneUser) {
        next(new Error("There is already user with phone : " + req.body.phone));
        return;
    }
    req.body.password = helper.encode(req.body.password);
    let result = await new DB(req.body).save();
    if (result) {
        Helper.fMsg(res, "Register success!!", req.body);
        return;
    }
    next(new Error("Register failed"));

}
module.exports = {
    getAll,
    create,
    update,
    drop,
    fetch,
    login,
    register
}  
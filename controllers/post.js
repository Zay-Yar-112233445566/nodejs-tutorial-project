
const DB = require("../models/post");
const Helper = require("../utils/helper")

const getAll = async (req, res, next) => {
    let posts = await DB.find().populate('user category', '-password -__v -created');
    if (posts !== null && posts.length > 0) {
        Helper.fMsg(res, "Get All Post successfully!!", posts);
    } else {
        next(new Error("Error,There are no any Posts"))
    }
}

const create = async (req, res, next) => {
    let userId = req.body.user._id;
    delete req.body.user;
    req.body.user = userId;
    console.log(req.body);
    let result = await new DB(req.body).save();
    Helper.fMsg(res, "Post Added Successfully", result);
}

const update = async (req, res, next) => {
    let post = await DB.findById(req.params.id);
    if (post) {
        await DB.findByIdAndUpdate(post._id, req.body);
        let updatePost = await DB.findById(post._id).populate('user category');
        if (updatePost) {
            Helper.fMsg(res, "Post successfully updated!", updatePost);
        } else {
            next(new Error("Update process failed"));
        }
    } else {
        next(new Error("There is no post with this id!!"));
    }
}

const drop = async (req, res, next) => {
    let post = await DB.findById(req.params.id);
    if (post) {
        let result = await DB.findByIdAndDelete(post._id);
        if (result) {
            Helper.fMsg(res, "Post successfully deleted");
        } else {
            next(new Error("Delete process fail ", result.Error));
        }

    } else {
        next(new Error("There is no post with this id!!!"));
    }

}

const fetch = async (req, res, next) => {
    let post = await DB.findById(req.params.id).populate('user category', '-password -__v');
    if (post) {
        Helper.fMsg(res, "Specified Post", post);
    } else {
        next(new Error("Error,There is no post with this id"));
    }
}
const getByCategory = async (req, res, next) => {
    let posts = await DB.find({ category: req.params.id }).populate('user category',' -__v -password');
    if (posts !== null && posts.length > 0) {
        Helper.fMsg(res, "Get  Posts successfully!!", posts);
    } else {
        next(new Error("Error,There are no any Posts"));
    }
}

const getByUser = async (req, res, next) => {
    let posts = await DB.find({ user: req.params.id }).populate('user category',' -__v -password');
    if (posts !== null && posts.length > 0) {
        Helper.fMsg(res, "Get  Posts successfully!!", posts);
    } else {
        next(new Error("Error,There are no any Posts"));
    }
}
module.exports = {
    getAll,
    create,
    update,
    drop,
    fetch,
    getByCategory,
    getByUser
}
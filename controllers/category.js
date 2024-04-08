const DB = require("../models/category");
const Helper = require("../utils/helper")

const getAll = async (req, res, next) => {
    let categories = await DB.find();
    Helper.fMsg(res, "Get All Categories successfully!!", categories);
}

const get = async (req, res, next) => {
    let category = await DB.findById(req.params.id);
    if (category) {
        Helper.fMsg(res, "Get single Categories successfully!!", category);
        return;
    }
    next(new Error("There is no category with this id!!"));
}
const create = async (req, res, next) => {
    let dbCategory = await DB.findOne({ name: req.body.name });
    if (dbCategory) {
        next(new Error("Category name is already in use!!"));
    } else {
        let result = await new DB(req.body).save();
        Helper.fMsg(res, "Category Added Successfully", result);
    }
}

const update = async (req, res, next) => {
    let category = await DB.findById(req.params.id);
    if (category) {
        let updateCategory = await DB.findByIdAndUpdate(category._id, req.body);
        if (updateCategory) {
            let retCategory = await DB.findById(updateCategory._id);
            Helper.fMsg(res, "Category Successfully Updated", retCategory);
        } else {
            res.json({ msg: "Category not updated successfully" });
        }
    } else {
        next(new Error("Error,Category not Found with this id"))
    }
}

// const drop = async (req, res, next) => {
//     let result = await DB.findByIdAndDelete(req.params.id);
//     if(result){
//         Helper.fMsg(res, "Deleted successfully!");
//         next();
//     }
//     next(new Error("There is no category with this id"));
// }
const drop = async (req, res, next) => {
    let dbCategory = await DB.findById(req.params.id);
    if (dbCategory) {
        let result = await DB.findByIdAndDelete(req.params.id);
        if (result) {
            Helper.fMsg(res, "Deleted successfully!");
            next();
        } else {
            next(new Error("Delete Process not completed"));
        }
    } else {
        next(new Error("There is no category with this id"));
    }
}
module.exports = {
    getAll,
    create,
    get,
    update,
    drop
}

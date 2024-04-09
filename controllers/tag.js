
const DB = require("../models/tag");
const Helper = require("../utils/helper")

const getAll = async (req, res, next) => {
    let tags = await DB.find();
    if (tags !== null && tags.length > 0) {
        Helper.fMsg(res, "Get All Tags successfully!!", tags);
    } else {
        next(new Error("Error,There are no any Tags"))
    }
}

const create = async (req, res, next) => {
    let dbTag = await DB.findOne({ name: req.body.name });
    if (dbTag) {
        next(new Error("Tag name is already in use"));
    } else {
        let result = await new DB(req.body).save();
        if(result){
            Helper.fMsg(res, "Tags Added Successfully", result);
            return; 
        }
        next(new Error("Tag add process fail!!"));
      
    }
}
module.exports = {
    getAll,
    create
}
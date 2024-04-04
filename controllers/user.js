const DB = require("../dbs/user");
const Helper = require("../utils/helper") 

const getAll = async (req, res, next) => {
    let users = await DB.find();
    Helper.fMsg(res, "Get All user successfully!!", users);
}

const create = async (req, res, next) => {
   let result = await new DB(req.body).save();
   Helper.fMsg(res,"User Added Successfully",result)
}

const update = async (req, res, next) =>{
    let user = await DB.findById(req.params.id);
    if(user){
        let updateUser = await DB.findByIdAndUpdate(user._id, req.body);
        if(updateUser){
            let retUser = await DB.findById(updateUser._id);
            Helper.fMsg(res,"User Successfully Updated", retUser);
        }else{
            res.json({msg:"User not updated successfully"});
        }
    }else{
        next(new Error("Error,User not Found with this id"))
    }
}

const drop = async (req, res, next) => {
    await DB.findByIdAndDelete(req.params.id);
    Helper.fMsg(res,"Deleted successfully!");
}

const fetch = async (req, res, next) => {
   let user = await DB.findById(req.params.id);
   Helper.fMsg(res,"Specified User", user);
}
module.exports = {
    getAll,
    create,
    update,
    drop,
    fetch
}
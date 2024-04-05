
const DB = require("../dbs/post");
const Helper = require("../utils/helper") 

const getAll = async (req, res, next) => {
    let posts = await DB.find().populate('user','-password -__v');
    if(posts !== null && posts.length > 0){
        Helper.fMsg(res, "Get All Post successfully!!", posts);
    }else{
        next(new Error("Error,There are no any Posts"))
    }
}

const create = async (req, res, next) => {
    let result = await new DB(req.body).save();
    Helper.fMsg(res,"Post Added Successfully",result);
}

const update = async (req, res, next) =>{
    res.json({msg:"Post is successfully updated!"});
}

const drop = async (req, res, next) => {
    res.json({msg:" Post is successfully deleted"});
}

const fetch = async (req, res, next) => {
   let post = await DB.findById(req.params.id).populate('user', '-password -__v');
   if(post){
    Helper.fMsg(res,"Specified Post", post);
   }else{
    next(new Error("Error,There is no post with this id"));
   }
 
}
module.exports = {
    getAll,
    create,
    update,
    drop,
    fetch
}
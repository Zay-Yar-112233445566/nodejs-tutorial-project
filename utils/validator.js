const jwt = require('jsonwebtoken');    
const UserDB = require('../models/user');
module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = schema.validate(req.body);
            if (result.error) {
                next(new Error(result.error.message));
            } else {
                next();
            }
        }
    },
    validateParam: (schema, name) => {
        return (req, res, next) => {
            let obj = {};
            obj[`${name}`] = req.params[`${name}`];
            let result = schema.validate(obj);
            if (result.error) {
                next(new Error(result.error.message));
            } else {
                next();
            }
        }
    },
    validateToken: async (req, res, next) => {
        if(req.headers.authorization){
            let decode = jwt.decode(req.headers.authorization.split(" ")[1]);
            let user = await UserDB.findById(decode._id);
            if(user){
                req.body["user"] = user;
                next();
            }else{
                next(new Error("Tokenization Error!!"));    
            }
        }else{ 
           next(new Error("Tokenization Error!!"));    
        }
    
    }
}
const Joi = require('joi');

module.exports = {
    Schema:{
        AddCategory: Joi.object({
            name: Joi.string().required(),
            image: Joi.string().required()
        })
    },
    AllSchema:{
        id:Joi.object({
            id:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        image:Joi.object({
            image:Joi.string().required()
        })
    }
}
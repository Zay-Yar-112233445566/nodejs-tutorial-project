const getAll = async (req, res, next) => {
    res.json({msg:"Get All Roles"});
}

const create = async (req, res, next) => {
    res.json({msg: "New post is created successfully!"});
}

const update = async (req, res, next) =>{
    res.json({msg:"Post is successfully updated!"});
}

const drop = async (req, res, next) => {
    res.json({msg:" Post is successfully deleted"});
}

const fetch = async (req, res, next) => {
    res.json({msg: "Get specified post!"});
}
module.exports = {
    getAll,
    create,
    update,
    drop,
    fetch
}
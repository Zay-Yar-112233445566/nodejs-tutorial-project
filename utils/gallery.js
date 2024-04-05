const fs = require('fs');
const saveFile = async (req, res, next) => {
    let file = req.files.file;
    let fileName = new Date().valueOf() + "_" + file.name;
    file.mv(`./uploads/${fileName}`);
    req.body["imageName"] = fileName;
    next();
}
const saveFiles = async (req, res, next) =>{
    let files = req.files.files;
    let fileNames = [];
    files.forEach((file) => {
      let fileName = new Date().valueOf() +"_" + file.name;
      file.mv(`./uploads/${fileName}`);  
      fileNames.push(fileName);
    })
    req.body["saveFiles"] = fileNames;
    next();
}
const deleteFile = async(filename) => {
   await fs.unlinkSync(`./uploads/${filename}`);
}
module.exports = {
    saveFile,
    saveFiles,
    deleteFile
}
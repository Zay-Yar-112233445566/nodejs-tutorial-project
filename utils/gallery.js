const fs = require('fs');
const path = require('path');
const categoryDB = require("../models/category");

const saveFile = async (req, res, next) => {
    let file = req.files.file;
    let fileName = new Date().valueOf() + "_" + file.name;
    file.mv(`./uploads/${fileName}`);
    req.body["image"] = fileName;
    next();
}
const updateFile = async (req, res, next) => {
    let file = req.files.file;
    let fileName = new Date().valueOf() + "_" + file.name;
    let filePath = path.join('./uploads', fileName);

    try {
        // Assuming you have an ID associated with the record
        let id = req.params.id; // Assuming the ID is passed in the request params
        console.log('Record ID:', id);

        // Retrieve existing image filename from the database based on recordId
        let category = await categoryDB.findById(id);
        console.log('Category:', category);

        if (!category) {
            console.error('Category not found for ID:', recordId);
            return res.status(404).send('Category not found');
        }

        if (category.image) {
            let dbImageFilePath = path.join('./uploads', category.image);

            // Delete existing image file from uploads directory
            fs.unlink(dbImageFilePath, (err) => {
                if (err) {
                    console.error('Error deleting existing file:', err);
                    // Handle error if necessary
                }
            });
        }

        // Move new file to uploads directory
        file.mv(filePath, (err) => {
            if (err) {
                console.error('Error saving file:', err);
                // Handle error if necessary
            }
            // Update database with new image filename
            category.image = fileName;
            category.save();
            req.body["image"] = fileName;
            next();
        });
    } catch (error) {
        console.error('Error:', error);
    }
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
    deleteFile,
    updateFile
}
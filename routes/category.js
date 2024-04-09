const router = require('express').Router();
const controller = require('../controllers/category')
const {saveFile,updateFile} = require('../utils/gallery');
const {Schema,AllSchema} = require('../utils/schema');
const {validateBody,validateParam,validateToken} = require('../utils/validator');
 

router.get("/", controller.getAll);
router.post("/", [saveFile,validateBody(Schema.AddCategory),controller.create]);

router.route("/:id")
    .get([validateToken,validateParam(AllSchema.id,"id"),controller.get])
    .patch([validateToken,updateFile,validateParam(AllSchema.id,"id"),validateBody(AllSchema.image),controller.update])
    .delete([validateToken,validateParam(AllSchema.id,"id"),controller.drop]);

module.exports = router;    
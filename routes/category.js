const router = require('express').Router();
const controller = require('../controllers/category')
const {saveFile} = require('../utils/gallery');
const {Schema,AllSchema} = require('../utils/schema');
const {validateBody,validateParam} = require('../utils/validator');
 

router.get("/", controller.getAll);
router.post("/", [saveFile,validateBody(Schema.AddCategory),controller.create]);

router.route("/:id")
    .get([validateParam(AllSchema.id,"id"),controller.get])
    .patch([saveFile,validateBody(AllSchema.image),controller.update])
    .delete([validateParam(AllSchema.id,"id"),controller.drop]);

module.exports = router;    
const router = require('express').Router();
const controller = require('../controllers/tag')
const { validateBody, validateToken } = require('../utils/validator');
const { saveFile } = require('../utils/gallery');
const { TagSchema } = require('../utils/schema');

router.get("/", controller.getAll);
router.post("/", [validateToken, saveFile, validateBody(TagSchema.AddTag), controller.create]);
module.exports = router;    
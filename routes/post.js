const router = require('express').Router();
const controller = require('../controllers/post');
const { validateToken, validateBody } = require('../utils/validator');
const { PostSchema } = require('../utils/schema');
const { saveFile } = require('../utils/gallery');

router.get("/", controller.getAll);

router.post("/", [validateToken, saveFile, validateBody(PostSchema.AddPost), controller.create]);
router.get("/byCategory/:id",[validateToken, controller.getByCategory]);
router.get("/byUser/:id",[validateToken, controller.getByUser]);
router.route("/:id")
  .get(controller.fetch)
  .patch(validateToken, controller.update)
  .delete(validateToken, controller.drop)


module.exports = router;
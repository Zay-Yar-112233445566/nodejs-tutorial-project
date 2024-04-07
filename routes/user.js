const router = require('express').Router();
const controller = require('../controllers/user')

router.get("/", controller.getAll);
router.post("/", controller.create);
router.route("/:id")
    .get(controller.fetch)
    .patch(controller.update)
    .delete(controller.drop)


module.exports = router;    
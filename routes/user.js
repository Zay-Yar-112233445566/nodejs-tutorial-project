const router = require('express').Router();
const controller = require('../controllers/user')
const {UserSchema} = require('../utils/schema');
const {validateBody,validateParam} = require('../utils/validator');

router.post("/", controller.login);
router.post("/register",[validateBody(UserSchema.AddUser),controller.register]);

router.get("/", controller.getAll);
router.post("/", controller.create);
router.route("/:id")
    .get(controller.fetch)
    .patch(controller.update)
    .delete(controller.drop)


module.exports = router;    
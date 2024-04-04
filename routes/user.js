const router = require('express').Router();
const controller = require('../controllers/user')

let userarray = [
    { id: 1, name: "Ko Ko", class: "FE" },
    { id: 2, name: "Aung Aung", class: "FE" },
    { id: 3, name: "Kay Thi", class: "FE" },
    { id: 4, name: "Zayar", class: "FE" },
    { id: 5, name: "Min Aung Hlaing", class: "FE" }
]



router.get("/", controller.getAll);
router.post("/", controller.create);
router.route("/:id")
    .get(controller.fetch)
    .patch(controller.update)
    .delete(controller.drop)


module.exports = router;    
const router = require('express').Router();
const controller = require('../controllers/role');

let rolearray = [
  { id: 1, name: "ADMIN", abbreviation: "AD" },
  { id: 2, name: "APPLICANT", abbreviation: "AP" },
  { id: 3, name: "PROJECT_MANAGER", abbreviation: "PM" },
  { id: 4, name: "DEPARTMENT_HEAD", abbreviation: "DPH" },
  { id: 5, name: "DIVISION_HEAD", abbreviation: "DVH" }
]

 router.get("/", controller.getAll);
 router.post("/", controller.create);
router.route("/:id")
  .get(controller.fetch)
  .patch(controller.update)
  .delete(controller.drop)

module.exports = router;
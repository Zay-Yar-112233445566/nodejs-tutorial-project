const router = require('express').Router();

let rolearray = [
  { id: 1, name: "ADMIN", abbreviation: "AD" },
  { id: 2, name: "APPLICANT", abbreviation: "AP" },
  { id: 3, name: "PROJECT_MANAGER", abbreviation: "PM" },
  { id: 4, name: "DEPARTMENT_HEAD", abbreviation: "DPH" },
  { id: 5, name: "DIVISION_HEAD", abbreviation: "DVH" }
]

router.get("/", (req, res) => {
  res.json(rolearray);
});

router.route("/:id")
  .get((req, res) => {
    let role = rolearray.find(role => role.id == req.params.id);
    if (role) {
      res.status(200).json(role);
    } else {
      res.json({ msg: "No Role Found" });
    }
  }

  )
  .patch((req, res) => {
    let role = rolearray.find(role => role.id == req.params.id);
    if (role) {
      role.name = req.body.name;
      role.abbreviation = req.body.abbreviation;
      res.status(200).json(rolearray);
    } else {
      res.json({ msg: "No Role Found" });
    }
  })
  .delete((req, res) => {
    let role = rolearray.find(role => role.id == req.params.id);
    if (role) {
      rolearray = rolearray.filter(role => role.id != req.params.id);
      res.status(200).json(rolearray);
    } else {
      res.json({ msg: "No Role Found" });
    }
  })

module.exports = router;
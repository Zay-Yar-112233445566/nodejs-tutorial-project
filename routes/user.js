const router = require('express').Router();


let userarray = [
    { id: 1, name: "Ko Ko", class: "FE" },
    { id: 2, name: "Aung Aung", class: "FE" },
    { id: 3, name: "Kay Thi", class: "FE" },
    { id: 4, name: "Zayar", class: "FE" },
    { id: 5, name: "Min Aung Hlaing", class: "FE" }
]

router.get("/", (req, res) => {
    res.json({ msg: "This is user management routes" });
});

router.route("/:id")
    .get((req, res) => {
        let user = userarray.find(usr => usr.id == req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.json({ msg: "No User Found" });
        }

    })
    .patch((req, res) => {
        let user = userarray.find(usr => usr.id == req.params.id);
        if (user) {
            user.name = req.body.name;
            user.class = req.body.class;
            res.status(200).json(userarray);
        } else {
            res.json({ msg: "No User Found" });
        }
    })
    .delete((req, res) => {
        let user = userarray.find(usr => usr.id == req.params.id);
        if(user){
        userarray = userarray.filter(usr => usr.id != req.params.id);
            res.status(200).json(userarray);
        }else{
            res.json({ msg: "No User Found" });
        }
 
    })


module.exports = router;    
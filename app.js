const express = require('express'); //importing express server
const server = express();  //initialize server
server.use(express.json());
const userRoute = require('./routes/user');
const roleRoute = require('./routes/role');
server.use("/roles",roleRoute);
server.use("/users",userRoute);



// let userarray = [
//     {id:1, name:"Ko Ko",class:"FE"},
//     {id:2, name:"Aung Aung",class:"FE"},
//     {id:3, name:"Kay Thi",class:"FE"},
//     {id:4, name:"Zayar",class:"FE"},
//     {id:5, name:"Min Aung Hlaing",class:"FE"}
// ]

// server.get("/users", (req, res, next) => {
//     res.status(200).json({userarray});
// });


// server.get("/user/:id", (req, res, next) => {
//   /*  let id = parseInt(req.params.id);
//     res.status(200).json(userarray[id-1]);*/

//     let id = req.params.id;
//     let user = userarray.find( usr => usr.id == id);
//     if(user){
//         res.status(200).json({user});
//     }else{
//         res.status(200).json({msg:"user Not Found"});
//     }
// })

// server.post("/user", (req, res, next) => {
//     userarray.push(req.body);
//     let user =userarray.find(usr => usr.id == req.body.id);
//     if(user){
//         console.log("New created user name"+ user.name);
//     }
//     res.status(200).json({userarray});
// })

// server.patch("/user/:id", (req, res, next) => {
//   let user = userarray.find(usr => usr.id == req.params.id);
//   if(user){
//     user.name = req.body.name;
//     res.status(200).json(userarray);
//   }else{
//     res.status(200).json({msg:"User not found"});
//   }
// })

// server.delete("/user/:id",(req, res, next)=>{
//     let deleteId = req.params.id;
//     userarray = userarray.filter(usr => usr.id != req.params.id);
//     res.status(200).json(userarray);
// });

// server.get("*", (req, res, next) => {
//     res.json({ msg: "Anonymous User", code: "1010" });
// })

server.listen(3000, console.log("Hello"));

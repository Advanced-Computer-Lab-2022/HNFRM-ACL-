const router = require('express').Router();
let Admin = require('../Models/Admin');

router.get('/',(req,res) =>{
    Admin.find()
    .then(adminControl => res.json(adminControl)).catch(err => res.status(400).json('Error:'+err));
});

router.post('/add',(req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const newAdmin = new Admin({username,password});
    newAdmin.save()
    .then(()=>res.json('Admin Added')).catch(err => res.status(400).json('Error:'+err));
});
module.exports = router;
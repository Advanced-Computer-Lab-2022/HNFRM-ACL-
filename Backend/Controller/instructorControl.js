const router = require('express').Router();
let Instructor = require('../Models/Instructor');

router.get('/',(req,res) =>{
    Instructor.find()
    .then(instructorControl => res.json(instructorControl)).catch(err => res.status(400).json('Error:'+err));
});

router.post('/add',(req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const course = req.body.course;

    const newInstructor = new Instructor({username,password,course});
    newInstructor.save()
    .then(()=>res.json('Instuctor Added')).catch(err => res.status(400).json('Error:'+err));
});
module.exports = router;
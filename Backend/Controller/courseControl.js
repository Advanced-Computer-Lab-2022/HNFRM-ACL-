const router = require('express').Router();
let Course = require('../Models/Course');

router.get('/',(req,res) =>{
    Course.findById(req.params.id)
    .then(course => res.json(course.price))
    .catch(err => res.status(400).json('Error:'+err));
});


router.get('/:id',async(req,res) =>{
    Course.findById(req.params.id)
    .then(course => res.json(course.price))
    .catch(err => res.status(400).json('Error:'+err));
});

router.post('/add',(req,res) => {
    const title = req.body.title;
    const subtitles = req.body.subtitles;
    const price=Number(req.body.price);
    const summary=req.body.summary;
    const newCourse = new Course({title,subtitles,price,summary});
    newCourse.save()
    .then(()=>res.json('Course Added')).catch(err => res.status(400).json('Error:'+err));
});
module.exports = router;
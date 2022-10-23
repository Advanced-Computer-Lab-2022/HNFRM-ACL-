const router = require('express').Router();
let Course = require('../Models/Course');


router.get('/',(req,res) =>{
    Course.find().select('title rating credithours')
    .then(course => res.json(course))
    .catch(err => res.status(400).json('Error:'+err));
});

router.get("/search/:key",async(req,res) =>{
    let data =await Course.find(
        {"$or":[
            {title:{$regex:req.params.key}},
            {subject:{$regex:req.params.key}},
            {taughtby:{$regex:req.params.key}}
        ]
        }
    );
    res.json(data);
});

router.get('/:id',async(req,res) =>{
    Course.findById(req.params.id).select('price')
    .then(course => res.json(course))
    .catch(err => res.status(400).json('Error:'+err));
});

router.post('/add',(req,res) => {
    const title = req.body.title;
    const subtitles = req.body.subtitles;
    const price=Number(req.body.price);
    const summary=req.body.summary;
    const credithours = Number(req.body.credithours);
    const rating = Number(req.body.rating);
    const subject=req.body.subject;
    const taughtby=req.body.taughtby;
    const newCourse = new Course({title,subtitles,price,summary,credithours,rating,subject,taughtby});
    newCourse.save()
    .then(()=>res.json('Course Added')).catch(err => res.status(400).json('Error:'+err));
});
module.exports = router;